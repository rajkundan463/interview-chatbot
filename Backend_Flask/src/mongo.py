from pymongo import MongoClient
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URL")

client = MongoClient(MONGO_URI)
db = client["chatbot"]
collection = db["questions"]

def insert_question(question, category, standard_answer, preprocessed_answer, answer_vector):
    doc = {
        "question_id": str(uuid.uuid4()),
        "question": question,
        "category": category,
        "standard_answer": standard_answer,
        "preprocessed_answer": preprocessed_answer,
        "answer_vector": answer_vector,
        "created_at": datetime.utcnow()
    }
    collection.insert_one(doc)

def get_question_by_id(question_id):
    return collection.find_one({"question_id": question_id})
