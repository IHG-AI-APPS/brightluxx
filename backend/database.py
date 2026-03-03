from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

products_col = db["products"]
inspirations_col = db["inspirations"]
projects_col = db["projects"]
leads_col = db["leads"]
admins_col = db["admins"]
