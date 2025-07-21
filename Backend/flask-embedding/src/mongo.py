from pymongo import MongoClient
import uuid
from datetime import datetime

# MongoDB connection URI
MONGO_URI = 'mongodb+srv://PayalAhirwar:cGF5YWxAMDU1@cluster0.kxxuacn.mongodb.net/chatbot?retryWrites=true&w=majority'

# Create MongoDB client and database
client = MongoClient(MONGO_URI)
db = client['chatbot']

# Define the collection to use
collection = db['questions']

def get_db():
    return db

def insert_question(question, category, standard_answer, preprocessed_answer, answer_vector):
    question_doc = {
        "question_id": str(uuid.uuid4()),
        "question": question,
        "category": category,
        "standard_answer": standard_answer,
        "preprocessed_answer": preprocessed_answer,
        "answer_vector": answer_vector,
        "created_at": datetime.utcnow()
    }

    collection.insert_one(question_doc)

def get_question_by_id(question_id):
    return collection.find_one({"question_id": question_id})
