from flask import Blueprint, request, jsonify
from mongo import get_question_by_id
from utils.embedding import embed_text
from utils.preprocess import preprocess
from utils.keyword_extractor import extract_keywords
from sklearn.metrics.pairwise import cosine_similarity
from google.generativeai import GenerativeModel, configure
import numpy as np
import os

compare_bp = Blueprint("compare", __name__)

configure(api_key=os.getenv("GEMINI_API_KEY"))
model = GenerativeModel("models/gemini-1.5-flash")

SIMILARITY_THRESHOLD = 0.75

@compare_bp.route("/compare", methods=["POST"])
def compare():
    data = request.get_json()
    question_id = data.get("question_id")
    user_answer = data.get("user_answer")

    question = get_question_by_id(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    standard_answer = question["standard_answer"]
    standard_vector = question["answer_vector"]

    processed_user = preprocess(user_answer)
    user_vector = embed_text(processed_user)

    similarity = cosine_similarity(
        [user_vector],
        [np.array(standard_vector)]
    )[0][0]

    feedback = "Good answer!"

    if similarity < SIMILARITY_THRESHOLD:
        missing = list(
            set(extract_keywords(preprocess(standard_answer)))
            - set(extract_keywords(processed_user))
        )

        prompt = f"""
        Question: {question['question']}
        Standard Answer: {standard_answer}
        User Answer: {user_answer}
        Missing concepts: {', '.join(missing)}

        Give constructive feedback in 2-3 lines.
        """
        feedback = model.generate_content(prompt).text.strip()

    return jsonify({
        "similarity": round(float(similarity), 3),
        "feedback": feedback
    })
