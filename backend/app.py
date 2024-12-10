# Import necessary libraries
import os
import logging
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
import json


# Import PrecisionTurn services
from services import ask_question, generate_apple_maps_token, get_tasks
from services.plan_generation_service import generate_project_plan
from utils.firestore_utils import store_plan, retrieve_plan, convert_to_serializable


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for all routes

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

# Route to generate project plan
@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.json
    plan_details = data.get('planDetails')

    try:
        logging.info(f"Generating plan with details: {plan_details}")
        plan = generate_project_plan(plan_details)
        plan_json = json.loads(plan)  # Ensure it's parsed as JSON
        plan_id = store_plan(plan_json)
        logging.info(f"Plan generated and stored with ID: {plan_id}")

        # Convert plan_json to a serializable format
        serializable_plan = json.loads(json.dumps(plan_json, default=convert_to_serializable))

        return jsonify({
            'plan': serializable_plan,
            'planId': plan_id
        })
    except Exception as e:
        logging.exception(f"Error generating plan: {str(e)}")
        return jsonify({'error': 'An error occurred while generating the plan'}), 500
        
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8001))
    app.run(host='localhost', port=port, debug=True)