# api/routes/plans.py

import json
from flask import Blueprint, request, jsonify
from api.services import TurnaroundPlanService
from infrastructure.utils.json_helper import DecimalEncoder, decimal_to_float
import logging

logger = logging.getLogger(__name__)
plans_bp = Blueprint('plans', __name__)
plan_service = TurnaroundPlanService()

@plans_bp.route('/generate', methods=['POST'])
def generate_plan():
    try:
        plan_details = request.get_json()
        
        required_fields = ['title', 'plantType', 'duration', 'budget', 'scope']
        missing_fields = [field for field in required_fields if field not in plan_details]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        plan = plan_service.create_and_save_plan(plan_details)
        # Convert Decimal to float before JSON serialization
        serializable_plan = decimal_to_float(plan)
        
        return json.dumps(serializable_plan, cls=DecimalEncoder), 200, {'Content-Type': 'application/json'}
        
    except Exception as e:
        logger.error(f"Error generating plan: {str(e)}")
        return jsonify({
            'error': 'Failed to generate plan',
            'details': str(e)
        }), 500

@plans_bp.route('/', methods=['GET'])
def list_plans():
    try:
        plans = plan_service.list_plans()
        serializable_plans = decimal_to_float(plans)
        return json.dumps(serializable_plans, cls=DecimalEncoder), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logger.error(f"Error listing plans: {str(e)}")
        return jsonify({'error': str(e)}), 500

@plans_bp.route('/<plan_id>', methods=['GET'])
def get_plan(plan_id):
    try:
        plan = plan_service.get_plan(plan_id)
        if not plan:
            return jsonify({'error': 'Plan not found'}), 404
        serializable_plan = decimal_to_float(plan)
        return json.dumps(serializable_plan, cls=DecimalEncoder), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logger.error(f"Error retrieving plan: {str(e)}")
        return jsonify({'error': str(e)}), 500