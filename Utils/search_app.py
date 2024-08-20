from flask import Flask, request, jsonify
from gemini_doc_query import ask_question  # Assuming ask_question is defined in gemini_doc_query.py
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No question provided'}), 400
    
    try:
        answer = ask_question(question)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=8001)