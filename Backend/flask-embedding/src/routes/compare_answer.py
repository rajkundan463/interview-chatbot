from flask import Blueprint, request, jsonify
from mongo import get_question_by_id
from utils.embedding import embed_text
from utils.preprocess import preprocess
from utils.keyword_extractor import extract_keywords 
from google.generativeai import GenerativeModel, configure
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Configure Gemini
configure(api_key="AIzaSyAZBbyTqJjIW9NJy-Nxr4VLMQYEqaFZJ-8")
model = GenerativeModel("models/gemini-1.5-flash")

compare_bp = Blueprint('compare_answer', __name__)

SIMILARITY_THRESHOLD = 0.8

@compare_bp.route('/compare', methods=['POST'])
def compare_answer():
    data = request.get_json()
    question_id = data.get("question_id")
    user_answer = data.get("user_answer")

    if not question_id or not user_answer:
        return jsonify({"error": "Both question_id and user_answer are required"}), 400

    # Step 1: Fetch question from DB
    question = get_question_by_id(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    standard_answer = question.get("standard_answer")
    preprocessed_vector = question.get("answer_vector")
    if not standard_answer or not preprocessed_vector:
        return jsonify({"error": "Standard answer or vector missing"}), 500

    try:
        # Step 2: Preprocess user answer
        preprocessed_user_answer = preprocess(user_answer)

        # Step 3: Embed user answer
        user_vector = embed_text(preprocessed_user_answer)
        if user_vector is None:
            return jsonify({"error": "Failed to embed user answer"}), 500

        # Step 4: Cosine similarity
        similarity = cosine_similarity(
            [user_vector],
            [np.array(preprocessed_vector)]
        )[0][0]

        feedback = "✅ Your answer is sufficiently close to the standard answer. Good job!"
        missing_keywords = []

        # Step 5: If similarity is below threshold → generate feedback
        if similarity < SIMILARITY_THRESHOLD:
            # Extract keywords
            std_keywords = extract_keywords(preprocess(standard_answer))
            user_keywords = extract_keywords(preprocessed_user_answer)

            # Find missing ones
            missing_keywords = list(set(std_keywords) - set(user_keywords))

            # Step 6: Targeted Gemini feedback
            prompt = (
                f"Provide constructive feedback on this answer in atmost 3 lines. Highlight the missing concepts: {', '.join(missing_keywords)}.\n\n"
                f"**Question:** {question['question']}\n"
                f"**Standard Answer:** {standard_answer}\n"
                f"**User Answer:** {user_answer}\n"
                f"Be kind, helpful, and detailed."
            )

            response = model.generate_content(prompt)
            feedback = response.text.strip() if response and response.text else "No feedback generated."

        return jsonify({
            "similarity": round(similarity, 4),
            "feedback": feedback,
            "missing_keywords": missing_keywords
        })

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
