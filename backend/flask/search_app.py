import os
import logging
from flask import Flask, request, jsonify
from gemini_doc_query import ask_question
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    question = data.get('question')
    if not question:
        logging.error("No question provided in the request")
        return jsonify({'error': 'No question provided'}), 400
    
    try:
        logging.info(f"Received question: {question}")
        answer = ask_question(question)
        logging.info(f"Generated answer: {answer}")
        return jsonify({'answer': answer})
    except Exception as e:
        logging.exception(f"Error processing question: {str(e)}")
        return jsonify({'error': 'An error occurred while processing your request'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8001))
    app.run(host='localhost', port=port, debug=True)