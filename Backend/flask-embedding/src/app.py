from flask import Flask
from routes.add_question import add_question_bp
from routes.compare_answer import compare_bp

app = Flask(__name__)

# Register API routes
app.register_blueprint(add_question_bp)
app.register_blueprint(compare_bp)

if __name__ == "__main__":
    app.run(port=6000)
