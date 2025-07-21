from flask import Blueprint, request, jsonify
from utils.embedding import embed_text
from utils.preprocess import preprocess
from mongo import insert_question
from google.generativeai import GenerativeModel, configure

add_question_bp = Blueprint('add_question', __name__)

# Configure Gemini
GEMINI_API_KEY = "AIzaSyAZBbyTqJjIW9NJy-Nxr4VLMQYEqaFZJ-8"
print(f"[DEBUG] GEMINI_API_KEY: {GEMINI_API_KEY}")
configure(api_key=GEMINI_API_KEY)
model = GenerativeModel("models/gemini-1.5-flash")

# Gemini answer generator
def get_standard_answer_from_gemini(question):
    try:
        prompt = f"Provide a detailed and structured answer for the following interview question:\n\n{question}"
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"[ERROR] Gemini API error: {str(e)}")
        return None

# Add question route
@add_question_bp.route('/add-question', methods=['POST'])
def add_question():
    data = request.get_json()
    question = data.get('question')
    category = data.get('category')

    if not question or not category:
        return jsonify({'error': 'question and category are required'}), 400

    try:
        standard_answer = get_standard_answer_from_gemini(question)
        if not standard_answer:
            return jsonify({'error': 'Failed to generate standard answer'}), 500

        preprocessed_answer = preprocess(standard_answer)
        answer_vector = embed_text(preprocessed_answer)

        if answer_vector is None:
            return jsonify({'error': 'Failed to generate embedding'}), 500

        insert_question(
            question=question,
            category=category,
            standard_answer=standard_answer,
            preprocessed_answer=preprocessed_answer,
            answer_vector=answer_vector.tolist()
        )

        return jsonify({
            'message': '✅ Question added successfully',
            'question': question,
            'category': category,
            'standard_answer': standard_answer
        }), 201

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
