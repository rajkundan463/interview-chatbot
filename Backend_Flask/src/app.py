from flask import Flask
from routes.add_question import add_question_bp
from routes.compare_answer import compare_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.register_blueprint(add_question_bp)
app.register_blueprint(compare_bp)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("FLASK_PORT", 6000)),
        debug=True
    )
