# Import necessary libraries
import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
# Import PrecisionTurn services

from services import ask_question, generate_apple_maps_token, get_tasks

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Default route to check if the server is running
@app.route('/')
def index():
    return "PrecisionTurn Backend is running!"

# Route to handle the question query for the LLM model
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

# Route to generate Apple Maps token
@app.route('/generate-token', methods=['GET'])
def apple_maps_token():
    token = generate_apple_maps_token()
    return jsonify({'token': token})

# Route to get the list of tasks
@app.route('/tasks', methods=['GET'])
def tasks():
    tasks = get_tasks()
    return jsonify(tasks)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8001))
    app.run(host='localhost', port=port, debug=True)