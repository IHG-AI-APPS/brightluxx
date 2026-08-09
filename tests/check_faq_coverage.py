import asyncio, os, sys
sys.path.insert(0, "/app/backend")
from dotenv import load_dotenv
load_dotenv("/app/backend/.env")
from motor.motor_asyncio import AsyncIOMotorClient


async def main():
    client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    blogs = await db["blogs"].find({}, {"slug": 1, "faq": 1, "faqs": 1}).to_list(500)
    with_faq = [b["slug"] for b in blogs if b.get("faq")]
    with_faqs_alt = [b["slug"] for b in blogs if b.get("faqs") and not b.get("faq")]
    print(f"blogs total={len(blogs)} with faq={len(with_faq)} with 'faqs' key only={len(with_faqs_alt)}")
    print("no faq:", [b["slug"] for b in blogs if not b.get("faq")])
    print("faqs-only:", with_faqs_alt)

    prods = await db["products"].find({}, {"slug": 1, "faq": 1}).to_list(500)
    print(f"products total={len(prods)} with faq={len([p for p in prods if p.get('faq')])}")
    print("products without faq:", [p["slug"] for p in prods if not p.get("faq")][:30])

    for coll in ["page_seo", "case_studies", "solutions_content", "applications_content",
                 "technologies_content", "inspirations", "pixelvue_products"]:
        print(coll, await db[coll].count_documents({}))
    client.close()

asyncio.run(main())
