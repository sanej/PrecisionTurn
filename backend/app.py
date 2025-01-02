# app.py

from flask import Flask
from flask_cors import CORS
import logging

from api.routes import plans_bp
from api.routes import knowledge_bp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register blueprints
app.register_blueprint(plans_bp, url_prefix='/api/plans')
app.register_blueprint(knowledge_bp, url_prefix='/api/rag')

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return {'message': 'Hello World!'}

@app.errorhandler(Exception)
def handle_error(error):
    logger.error(f"An error occurred: {str(error)}")
    return {'error': str(error)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)