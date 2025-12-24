# import os
# import google.generativeai as genai
# from flask import Blueprint, request, jsonify

# # Create Flask blueprint
# get_answer_bp = Blueprint('get_answer', __name__)

# # Load Gemini API key from environment variable (✅ Secure)
# GEMINI_API_KEY="AIzaSyAZBbyTqJjIW9NJy-Nxr4VLMQYEqaFZJ-8"
# genai.configure(api_key=GEMINI_API_KEY)

# # Load Gemini model once (✅ Efficient)
# model = genai.GenerativeModel('models/gemini-1.5-flash')

# # ✅ Reusable function for internal use (e.g., in /add-question)
# def get_standard_answer(question):
#     try:
#         response = model.generate_content(question)
#         answer = response.text.strip() if response and response.text else None
#         return {"answer": answer}
#     except Exception as e:
#         return {"error": str(e)}

# # ✅ Optional: Flask route for external clients
# @get_answer_bp.route('/get_answer', methods=['POST'])
# def get_answer_api():
#     data = request.get_json()
#     question = data.get('question')

#     if not question:
#         return jsonify({'error': 'Question is required'}), 400

#     result = get_standard_answer(question)

#     if 'error' in result:
#         return jsonify({'error': result['error']}), 500

#     return jsonify({'answer': result['answer']})
