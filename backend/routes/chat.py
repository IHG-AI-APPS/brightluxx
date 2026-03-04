"""AURA — AI-powered specifier chat assistant."""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

from emergentintegrations.llm.chat import LlmChat, UserMessage
from database import db
from email_service import send_email, NOTIFICATION_EMAIL

router = APIRouter()

OPENAI_KEY = os.environ.get("OPENAI_API_KEY")

chat_sessions_col = db["chat_sessions"]

SYSTEM_PROMPT = """You are AURA, the AI specification assistant for Brightluxx — a premium LED display company serving architects, consultants, and contractors across the UAE and GCC region.

Your role: Help specifiers choose the right LED display technology for their projects. You provide expert, concise advice on pixel pitch, brightness, mounting, technology selection, and project planning.

PERSONALITY:
- Professional but approachable — like a senior AV consultant
- Concise: keep responses under 150 words unless technical detail is needed
- Always recommend next steps (view a technology page, use the calculator, request design assist)
- Reference Brightluxx's resources when relevant

KNOWLEDGE BASE:

TECHNOLOGIES (recommend by application):
- MicroLED (P0.4-P0.9): Ultra-premium, luxury hospitality, close viewing (<2m), best contrast/colour
- COB LED (P0.6-P1.2): High-end retail & hospitality, excellent durability, anti-glare coating
- MiP LED (P0.7-P1.5): Next-gen packaging, balance of quality and cost
- Fine Pitch LED (P1.2-P2.5): Corporate, command centers, transport, 24/7 operation, best value
- All-in-One dvLED (P0.9-P1.8): Healthcare, plug-and-play, no external processors
- Transparent LED (P2.6-P10): Glass facades, retail storefronts, 60-90% transparency
- 3D Anamorphic LED (P2.5-P4.0): Landmark outdoor, glasses-free 3D, corner L-shaped
- Creative LED (P1.5-P4.0): Curved, cylindrical, ceiling, custom shapes for entertainment
- Media Facade (P3.9-P25): Building-scale outdoor, integrated with architecture

PIXEL PITCH GUIDE:
- Under 2m viewing: P0.7-P1.2 (use MicroLED or COB)
- 2-5m viewing: P1.2-P2.0 (Fine Pitch or COB)
- 5-10m viewing: P2.0-P4.0 (Fine Pitch or Creative)
- 10m+: P4.0-P10+ (Outdoor, Transparent, Media Facade)
- Formula: Minimum pitch (mm) = viewing distance (m) × 0.6

BRIGHTNESS GUIDE:
- Indoor controlled (office, museum): 400-600 nits
- Indoor bright (retail, lobby): 800-1,200 nits
- Semi-outdoor (covered terrace): 1,500-3,000 nits
- Fully outdoor: 5,000-8,000 nits

SERVICES:
- Free Design Assist: concept consultation, specifications, budget estimates → /design-assist
- CPD / Lunch & Learn: free training sessions for architect teams → /cpd-programme
- Technology Selector Quiz: interactive 5-question tool → /technology-selector
- Screen Calculator: pixel pitch and resolution calculations → /calculator
- Budget Estimator: project cost estimates → /budget-estimator

CASE STUDIES (reference when relevant):
- Jumeirah Al Naseem: MicroLED P0.7, hotel lobby, 42 sqm
- Dubai Mall: COB P0.9, luxury retail, 32 sqm
- ADNOC HQ: Fine Pitch P1.2, command center, 54 sqm
- Riyadh Metro: Fine Pitch P1.5, transport, 186 displays
- Expo City Dubai: Creative LED P2.6, 360° cylindrical, 280 sqm
- Cleveland Clinic: All-in-One dvLED P1.2, hospital wayfinding, 24 displays
- The View at The Palm: Transparent LED P3.9, observation deck, 208 sqm
- KAPSARC: 3D Anamorphic P2.5, corporate landmark, 144 sqm

IMPORTANT RULES:
1. Never make up specifications or prices — always recommend the user contact Brightluxx for exact pricing
2. When recommending a technology, suggest they visit the relevant technology page (e.g., "Check our MicroLED guide at /technology/microled")
3. For project-specific questions, recommend the Design Assist service
4. Keep the conversation focused on LED displays and Brightluxx services
5. If asked about competitors, stay neutral and focus on Brightluxx's strengths
6. For pricing questions, say "For accurate pricing, I recommend requesting a budgetary estimate through our Design Assist service"
"""


class ChatMessage(BaseModel):
    session_id: str
    message: str


class LeadCapture(BaseModel):
    session_id: str
    name: str
    email: str
    company: str
    role: Optional[str] = ""


# In-memory LlmChat instances
_chat_instances = {}


def _get_chat(session_id: str) -> LlmChat:
    if session_id not in _chat_instances:
        _chat_instances[session_id] = LlmChat(
            api_key=OPENAI_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("openai", "gpt-5.2")
    return _chat_instances[session_id]


@router.post("/api/chat/message")
async def chat_message(data: ChatMessage):
    if not OPENAI_KEY:
        raise HTTPException(status_code=500, detail="Chat service unavailable.")

    chat = _get_chat(data.session_id)

    try:
        user_msg = UserMessage(text=data.message)
        response = await chat.send_message(user_msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")

    # Store in DB
    now = datetime.now(timezone.utc)
    await chat_sessions_col.update_one(
        {"session_id": data.session_id},
        {
            "$push": {
                "messages": {
                    "$each": [
                        {"role": "user", "content": data.message, "ts": now},
                        {"role": "assistant", "content": response, "ts": now},
                    ]
                }
            },
            "$set": {"updated_at": now},
            "$setOnInsert": {"created_at": now, "lead_captured": False},
            "$inc": {"message_count": 1},
        },
        upsert=True,
    )

    # Get current message count for lead gate
    session = await chat_sessions_col.find_one(
        {"session_id": data.session_id}, {"_id": 0, "message_count": 1, "lead_captured": 1}
    )
    msg_count = session.get("message_count", 0) if session else 0
    lead_captured = session.get("lead_captured", False) if session else False

    return {
        "response": response,
        "message_count": msg_count,
        "show_lead_form": msg_count >= 3 and not lead_captured,
    }


@router.post("/api/chat/lead")
async def chat_lead_capture(data: LeadCapture):
    from database import leads_col

    lead_dict = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "company": data.company,
        "role": data.role,
        "source": "aura_chat",
        "application": "AURA Chat Assistant",
        "status": "new",
        "notes": f"Chat session: {data.session_id}",
        "created_at": datetime.now(timezone.utc),
    }

    await leads_col.insert_one(lead_dict)
    await chat_sessions_col.update_one(
        {"session_id": data.session_id},
        {"$set": {"lead_captured": True, "lead_email": data.email}},
    )

    # Email notification
    if NOTIFICATION_EMAIL:
        try:
            html = f"""
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:linear-gradient(135deg,#1a1a1a,#111);border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:#E5C574;margin-bottom:4px;">AURA CHAT ASSISTANT</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;">New Chat Lead Captured</div>
              </div>
              <div style="padding:4px 12px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Name</td><td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:bold;border-bottom:1px solid #222;">{data.name}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #222;"><a href="mailto:{data.email}" style="color:#E5C574;text-decoration:none;">{data.email}</a></td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Company</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.company}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Role</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.role}</td></tr>
                </table>
              </div>
              <div style="padding:16px 24px;text-align:center;border-top:1px solid #222;">
                <div style="font-size:11px;color:#666;">Lead captured via AURA Chat — Brightluxx Website</div>
              </div>
            </div>
            """
            await send_email(NOTIFICATION_EMAIL, f"AURA Chat Lead: {data.name} ({data.company})", html)
        except Exception:
            pass

    return {"success": True, "message": "Thank you! Continue chatting with AURA."}
