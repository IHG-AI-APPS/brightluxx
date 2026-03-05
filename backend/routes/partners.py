"""Routes for distribution, supplier registration, and technical support forms."""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid

from database import db, leads_col
from email_service import send_email, NOTIFICATION_EMAIL

router = APIRouter()


class FranchiseRequest(BaseModel):
    name: str
    company: str
    email: str
    phone: str
    country: str
    city: str
    business_type: str = ""
    experience: str = ""
    message: str = ""


class SupplierRegistration(BaseModel):
    company_name: str
    contact_person: str
    email: str
    phone: str
    country: str
    product_category: str
    certifications: str = ""
    website: str = ""
    message: str = ""


class TechnicalSupportRequest(BaseModel):
    name: str
    company: str
    email: str
    phone: str
    product: str = ""
    issue_type: str = ""
    description: str
    urgency: str = "normal"


@router.post("/api/franchise-request")
async def franchise_request(data: FranchiseRequest):
    lead = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "company": data.company,
        "email": data.email,
        "phone": data.phone,
        "source": "franchise_request",
        "application": f"Franchise/Distribution — {data.country}, {data.city}",
        "status": "new",
        "notes": f"Business Type: {data.business_type}\nExperience: {data.experience}\nMessage: {data.message}",
        "created_at": datetime.now(timezone.utc),
    }
    await leads_col.insert_one(lead)

    if NOTIFICATION_EMAIL:
        try:
            html = f"""
            <div style="font-family:Arial;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:#1a1a1a;border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:#E5C574;">FRANCHISE / DISTRIBUTION REQUEST</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;margin-top:4px;">{data.company}</div>
              </div>
              <div style="padding:16px 24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Name</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.name}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Email</td><td style="padding:6px 0;"><a href="mailto:{data.email}" style="color:#E5C574;">{data.email}</a></td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Phone</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.phone}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Location</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.country}, {data.city}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Business</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.business_type}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Experience</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.experience}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Message</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.message}</td></tr>
                </table>
              </div>
            </div>"""
            await send_email(NOTIFICATION_EMAIL, f"Franchise Request: {data.company} ({data.country})", html)
        except Exception:
            pass

    return {"success": True, "message": "Thank you! We will review your application and get back to you within 48 hours."}


@router.post("/api/supplier-registration")
async def supplier_registration(data: SupplierRegistration):
    doc = {
        "id": str(uuid.uuid4()),
        "company_name": data.company_name,
        "contact_person": data.contact_person,
        "email": data.email,
        "phone": data.phone,
        "country": data.country,
        "product_category": data.product_category,
        "certifications": data.certifications,
        "website": data.website,
        "message": data.message,
        "status": "pending",
        "created_at": datetime.now(timezone.utc),
    }
    await db["supplier_registrations"].insert_one(doc)

    # Also create a lead
    lead = {
        "id": doc["id"],
        "name": data.contact_person,
        "company": data.company_name,
        "email": data.email,
        "phone": data.phone,
        "source": "supplier_registration",
        "application": f"Supplier — {data.product_category}",
        "status": "new",
        "notes": f"Certifications: {data.certifications}\nWebsite: {data.website}\nMessage: {data.message}",
        "created_at": datetime.now(timezone.utc),
    }
    await leads_col.insert_one(lead)

    if NOTIFICATION_EMAIL:
        try:
            html = f"""
            <div style="font-family:Arial;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:#1a1a1a;border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:#E5C574;">SUPPLIER REGISTRATION</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;margin-top:4px;">{data.company_name}</div>
              </div>
              <div style="padding:16px 24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Contact</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.contact_person}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Email</td><td style="padding:6px 0;"><a href="mailto:{data.email}" style="color:#E5C574;">{data.email}</a></td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Category</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.product_category}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Certifications</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.certifications}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Website</td><td style="padding:6px 0;"><a href="{data.website}" style="color:#E5C574;">{data.website}</a></td></tr>
                </table>
              </div>
            </div>"""
            await send_email(NOTIFICATION_EMAIL, f"Supplier Registration: {data.company_name}", html)
        except Exception:
            pass

    return {"success": True, "message": "Registration received! Our procurement team will review and contact you."}


@router.post("/api/technical-support")
async def technical_support(data: TechnicalSupportRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "company": data.company,
        "email": data.email,
        "phone": data.phone,
        "product": data.product,
        "issue_type": data.issue_type,
        "description": data.description,
        "urgency": data.urgency,
        "status": "open",
        "created_at": datetime.now(timezone.utc),
    }
    await db["support_tickets"].insert_one(doc)

    lead = {
        "id": doc["id"],
        "name": data.name,
        "company": data.company,
        "email": data.email,
        "phone": data.phone,
        "source": "technical_support",
        "application": f"Support — {data.issue_type} ({data.urgency})",
        "status": "new",
        "notes": f"Product: {data.product}\nIssue: {data.issue_type}\nUrgency: {data.urgency}\nDescription: {data.description}",
        "created_at": datetime.now(timezone.utc),
    }
    await leads_col.insert_one(lead)

    if NOTIFICATION_EMAIL:
        urgency_label = "URGENT" if data.urgency == "urgent" else "Normal"
        try:
            html = f"""
            <div style="font-family:Arial;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:#1a1a1a;border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:{'#ff4444' if data.urgency == 'urgent' else '#E5C574'};">TECHNICAL SUPPORT — {urgency_label}</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;margin-top:4px;">{data.company}</div>
              </div>
              <div style="padding:16px 24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Name</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.name}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Email</td><td style="padding:6px 0;"><a href="mailto:{data.email}" style="color:#E5C574;">{data.email}</a></td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Phone</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.phone}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Product</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.product}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Issue</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.issue_type}</td></tr>
                  <tr><td style="padding:6px 0;color:#999;font-size:13px;">Description</td><td style="padding:6px 0;color:#fff;font-size:13px;">{data.description}</td></tr>
                </table>
              </div>
            </div>"""
            await send_email(NOTIFICATION_EMAIL, f"[{urgency_label}] Support: {data.issue_type} — {data.company}", html)
        except Exception:
            pass

    return {"success": True, "message": "Support ticket created! Our technical team will respond within 4 hours for urgent requests."}
