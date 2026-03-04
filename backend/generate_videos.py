"""Generate hero videos using Sora 2 for Brightluxx homepage."""
import os
import sys
import time
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

VIDEO_1_PROMPT = """Cinematic aerial drone shot of Dubai at twilight. Camera glides over the glowing skyline revealing massive LED screens on futuristic skyscrapers displaying vibrant digital art. The camera smoothly transitions through a glass facade into a luxury hotel lobby where a stunning floor-to-ceiling MicroLED video wall displays an immersive ocean scene. Premium interior, marble floors, warm ambient lighting. Ultra-high quality, 4K cinematic look, smooth camera movement, professional color grading."""

VIDEO_2_PROMPT = """Cinematic walkthrough of a premium Dubai shopping mall interior. Camera glides past a spectacular curved LED digital signage display showing luxury brand content, surrounded by elegant architecture and shoppers. Smooth transition to an exterior shot of a modern luxury villa in Dubai with a large outdoor LED TV screen by the infinity pool, displaying vibrant content against a sunset sky. Palm trees, warm golden hour lighting, ultra-premium lifestyle. 4K cinematic quality, smooth dolly movement, professional color grading."""

OUTPUT_DIR = "/app/frontend/public/videos"


def generate_video(prompt, output_path, video_num):
    print(f"\n{'='*60}")
    print(f"Starting Video {video_num} generation...")
    print(f"Output: {output_path}")
    print(f"{'='*60}")
    start = time.time()

    video_gen = OpenAIVideoGeneration(api_key=os.environ["EMERGENT_LLM_KEY"])
    video_bytes = video_gen.text_to_video(
        prompt=prompt,
        model="sora-2",
        size="1280x720",
        duration=12,
        max_wait_time=900,
    )

    if video_bytes:
        video_gen.save_video(video_bytes, output_path)
        elapsed = time.time() - start
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"Video {video_num} saved: {output_path} ({size_mb:.1f} MB) in {elapsed:.0f}s")
        return True
    else:
        print(f"Video {video_num} generation FAILED after {time.time()-start:.0f}s")
        return False


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    which = sys.argv[1] if len(sys.argv) > 1 else "both"

    if which in ("1", "both"):
        generate_video(VIDEO_1_PROMPT, f"{OUTPUT_DIR}/hero-video-1.mp4", 1)

    if which in ("2", "both"):
        generate_video(VIDEO_2_PROMPT, f"{OUTPUT_DIR}/hero-video-2.mp4", 2)

    print("\nDone!")
