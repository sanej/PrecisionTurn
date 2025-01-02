# api/routes/knowledge.py
from flask import Blueprint, request, jsonify
from api.services import KnowledgeBaseService
import logging

logger = logging.getLogger(__name__)
knowledge_bp = Blueprint('knowledge', __name__)
kb_service = KnowledgeBaseService()

@knowledge_bp.route('/query', methods=['POST'])
def query_kb():
    try:
        data = request.get_json()
        question = data.get('question')
        
        if not question:
            return jsonify({'error': 'No question provided'}), 400
            
        result = kb_service.query(question)
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500