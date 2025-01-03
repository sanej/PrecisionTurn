## api/services/turnaroundplanservice.py

# Import Precision Turnaround Plan Service
from infrastructure.db.repositories.plan_repository import PlanRepository
from infrastructure.db.models.plan import PlanModel

# Import AWS Bedrock client and AIMessage from langchain
from langchain_aws import ChatBedrockConverse
from langchain_core.messages import AIMessage

# Impport core libraries
import boto3
import json
import logging
from typing import Dict, Any
from datetime import datetime



logger = logging.getLogger(__name__)

class TurnaroundPlanService:
    def __init__(self):
        # Initialize AWS Bedrock client
        session = boto3.Session(profile_name='PrecisionTurn-Dev')
        self.llm = ChatBedrockConverse(
            model="us.amazon.nova-lite-v1:0",
            region_name='us-east-2'
        )
        # Initialize repository
        self.plan_repository = PlanRepository()

        # Industry benchmarks remain the same
        self.industry_benchmarks = {
            "refinery": {
                "cost_per_day": 1500000,
                "safety_incident_rate": 0.5,
                "typical_duration_ranges": {
                    "small": {"min": 20, "max": 30},
                    "medium": {"min": 35, "max": 50},
                    "large": {"min": 45, "max": 70}
                }
            }
        }
        
    def generate_prompt(self, plan_details: Dict[str, Any]) -> str:
        return f"""Given the following turnaround project details:

                Title: {plan_details['title']}
                Plant Type: {plan_details['plantType']}
                Duration: {plan_details['duration']} days
                Budget: ${plan_details['budget']:,}
                Scope: {plan_details['scope']}
                Constraints: {plan_details.get('constraints', 'None specified')}

                Generate a structured turnaround plan with:

                1. Milestones: Break down into phases, each with:
                - Title of the phase
                - Duration in days
                - Key deliverables
                - Dependencies on other phases

                2. Resource Requirements:
                - Personnel with roles, count needed, and required skills
                - Equipment with types and quantities

                3. Risk Assessment:
                - High-risk items with titles
                - Detailed descriptions
                - Mitigation strategies

                4. Cost Breakdown:
                - Category of expense
                - Amount allocated
                - Additional details

                5. Safety Plan:
                - Required permits and certifications
                - Safety protocols and procedures

                Format your response exactly according to this schema:
                {self._get_plan_schema()}"""

        
    def analyze_scope(self, plan_details: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze if the scope is realistic based on industry benchmarks"""
        budget = plan_details.get('budget', 0)
        duration = plan_details.get('duration', 0)
        daily_cost = budget / duration if duration else 0
        benchmark_daily = self.industry_benchmarks["refinery"]["cost_per_day"]
        
        return {
            "is_realistic": 0.7 <= daily_cost/benchmark_daily <= 1.3,
            "benchmark_comparison": daily_cost/benchmark_daily,
            "recommendations": self._generate_scope_recommendations(daily_cost, benchmark_daily)
        }

    def _generate_scope_recommendations(self, actual: float, benchmark: float) -> list:
        if actual < benchmark * 0.7:
            return [
                "Budget may be insufficient for scope",
                "Consider reducing scope or increasing budget",
                "Focus on critical path items only"
            ]
        elif actual > benchmark * 1.3:
            return [
                "Budget higher than industry average",
                "Opportunity for scope optimization",
                "Consider parallel work streams"
            ]
        return ["Budget aligns with industry benchmarks"]

    def _build_enhanced_prompt(self, details: Dict[str, Any], scope_analysis: Dict[str, Any]) -> str:
        return f"""
        Create a detailed industrial turnaround plan for a {details.get('plantType', 'refinery')} with the following parameters:
        - Budget: ${details.get('budget', 0):,.2f}
        - Duration: {details.get('duration', 0)} days
        - Scope: {details.get('scope', '')}
        - Constraints: {details.get('constraints', 'None specified')}
        
        Industry Context:
        - Budget per day comparison: {scope_analysis['benchmark_comparison']:.2f}x industry average
        - Recommendations: {', '.join(scope_analysis['recommendations'])}
        
        Please provide a detailed plan including:
        1. Project Overview
        2. Key Milestones with timeline
        3. Resource Requirements
        4. Risk Assessment
        5. Critical Path Analysis
        6. Safety Considerations
        7. Innovation Opportunities
        
        Format the response as a structured JSON object following this schema:
        {self._get_plan_schema()}
        """

    def _get_plan_schema(self) -> str:
        return """
        {
            "milestones": [
                {
                    "title": string,
                    "duration": number,
                    "deliverables": [string],
                    "dependencies": [string]
                }
            ],
            "resources": {
                "personnel": [
                    {
                        "role": string,
                        "count": number,
                        "skills": string
                    }
                ],
                "equipment": [
                    {
                        "type": string,
                        "quantity": number
                    }
                ]
            },
            "risk_assessment": {
                "high_risks": [
                    {
                        "title": string,
                        "description": string,
                        "mitigation": string
                    }
                ]
            },
            "cost_breakdown": [
                {
                    "category": string,
                    "amount": number,
                    "details": string
                }
            ],
            "safety_plan": {
                "required_permits": [string],
                "safety_protocols": [string]
            }
        }
        """

    def generate_plan(self, plan_details: Dict[str, Any]) -> Dict[str, Any]:
        try:
            # Analyze scope and feasibility
            scope_analysis = self.analyze_scope(plan_details)
            
            # Build enhanced prompt
            prompt = self._build_enhanced_prompt(plan_details, scope_analysis)
            
            # Generate plan using Nova
            response = self.llm.invoke(prompt)
            
            # Parse and enhance the response
            try:
                base_plan = json.loads(response)
            except json.JSONDecodeError:
                logger.error("Failed to parse LLM response as JSON")
                base_plan = self._format_unstructured_response(response)
            
            # Enhance plan with additional insights
            enhanced_plan = {
                "id": str(int(datetime.now().timestamp())),
                "title": plan_details.get('title', 'Untitled Plan'),
                "status": "draft",
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat(),
                "details": {
                    **plan_details,
                    "generated_plan": base_plan,
                    "scope_analysis": scope_analysis,
                    "industry_benchmarks": {
                        "cost_per_day": self.industry_benchmarks["refinery"]["cost_per_day"],
                        "safety_incident_rate": self.industry_benchmarks["refinery"]["safety_incident_rate"]
                    }
                }
            }
            
            return enhanced_plan
            
        except Exception as e:
            logger.error(f"Error generating plan: {str(e)}")
            raise

    def _format_unstructured_response(self, response: str) -> Dict[str, Any]:
        """Format unstructured LLM response into consistent JSON structure"""
        return {
            "TurnaroundProject": {
                "ProjectSchedule": {
                    "MajorPhases": []
                },
                "ResourceAllocation": {
                    "RequiredPersonnel": [],
                    "EquipmentNeeds": []
                },
                "RiskAssessment": {
                    "PotentialRisks": []
                },
                "BudgetBreakdown": {
                    "LaborCosts": 0,
                    "EquipmentCosts": 0,
                    "MaterialCosts": 0
                },
                "Constraints": []
            },
            "warning": "Response was not in expected format, applying default structure"
        }


    # Create and save plan
    def create_and_save_plan(self, plan_details: Dict[str, Any]) -> Dict[str, Any]:
        """Generate and save a new plan"""
        try:
            # Generate plan using AI
            generated_plan = self.generate_plan_with_ai(plan_details)
            scope_analysis = self.analyze_scope(plan_details)
            
            # Create plan model (which will handle Decimal conversion)
            plan = PlanModel(
                title=plan_details['title'],
                status='draft',
                details={
                    **plan_details,
                    'generated_plan': generated_plan,
                    'scope_analysis': scope_analysis,
                    'industry_benchmarks': {
                        'cost_per_day': self.industry_benchmarks['refinery']['cost_per_day'],
                        'safety_incident_rate': self.industry_benchmarks['refinery']['safety_incident_rate']
                    }
                }
            )
        
            # Save to DynamoDB
            saved_plan = self.plan_repository.create(plan)
            return saved_plan.to_dynamodb_item()
        
        except Exception as e:
            logger.error(f"Error creating and saving plan: {str(e)}")
            raise

    # Generate plan with AI
    def generate_plan_with_ai(self, plan_details: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = self.generate_prompt(plan_details)
            ai_response = self.llm.invoke(prompt)
            
            if isinstance(ai_response, AIMessage):
                content = ai_response.content
            else:
                content = str(ai_response)
                
            # Extract and parse JSON
            try:
                start_idx = content.find('{')
                end_idx = content.rfind('}') + 1
                if start_idx != -1 and end_idx != -1:
                    json_str = content[start_idx:end_idx]
                    generated_plan = json.loads(json_str)
                    
                    # Add directly to plan details instead of nesting under generated_plan
                    plan_details['milestones'] = generated_plan.get('milestones', [])
                    plan_details['resources'] = generated_plan.get('resources', {})
                    plan_details['risk_assessment'] = generated_plan.get('risk_assessment', {})
                    plan_details['cost_breakdown'] = generated_plan.get('cost_breakdown', [])
                    plan_details['safety_plan'] = generated_plan.get('safety_plan', {})
                    
                    return plan_details
                else:
                    return self._format_unstructured_response(content)
            except json.JSONDecodeError as je:
                logger.error(f"JSON parsing error: {je}")
                return self._format_unstructured_response(content)
                
        except Exception as e:
            logger.error(f"Error generating plan with AI: {str(e)}")
            raise


    def get_plan(self, plan_id: str) -> Dict[str, Any]:
        """Retrieve a plan by ID"""
        plan = self.plan_repository.get(plan_id)
        return plan.to_dynamodb_item() if plan else None

    def list_plans(self, limit: int = 50) -> list:
        """List all plans"""
        plans = self.plan_repository.list(limit)
        return [plan.to_dynamodb_item() for plan in plans]

    def update_plan(self, plan_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        current_plan = self.get_plan(plan_id)
        if current_plan.status in ['approved', 'completed']:
            raise ValueError("Cannot edit approved or completed plans")
        
        # Validate status transition
        if 'status' in updates:
            new_status = updates['status']
            if not self._is_valid_status_transition(current_plan.status, new_status):
                raise ValueError(f"Invalid status transition from {current_plan.status} to {new_status}")
        
        return self.plan_repository.update(plan_id, updates)

    def _is_valid_status_transition(self, current: str, new: str) -> bool:
        valid_transitions = {
            'draft': ['approved'],
            'approved': ['in_progress'],
            'in_progress': ['completed'],
            'completed': []
        }
        return new in valid_transitions.get(current, [])

    def delete_plan(self, plan_id: str) -> bool:
        """Delete a plan"""
        return self.plan_repository.delete(plan_id)
