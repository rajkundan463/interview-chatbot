from flask import Blueprint, request, jsonify
from utils.embedding import embed_text
from utils.preprocess import preprocess
from mongo import insert_question
from google.generativeai import GenerativeModel, configure
import os

add_question_bp = Blueprint("add_question", __name__)

configure(api_key=os.getenv("GEMINI_API_KEY"))
model = GenerativeModel("models/gemini-1.5-flash")

def generate_standard_answer(question):
    prompt = f"""
    Provide a detailed interview-ready answer for the following question:
    {question}
    """
    response = model.generate_content(prompt)
    return response.text.strip()

@add_question_bp.route("/add-question", methods=["POST"])
def add_question():
    data = request.get_json()
    question = data.get("question")
    category = data.get("category")

    if not question or not category:
        return jsonify({"error": "question and category required"}), 400

    standard_answer = generate_standard_answer(question)
    preprocessed = preprocess(standard_answer)
    vector = embed_text(preprocessed)

    insert_question(
        question,
        category,
        standard_answer,
        preprocessed,
        vector.tolist()
    )

    return jsonify({
        "message": "Question added successfully",
        "question": question,
        "category": category
    }), 201
