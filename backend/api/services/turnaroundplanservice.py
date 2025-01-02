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

                Please analyze and provide a comprehensive plan with:

                1. Risk Assessment:
                - Identify potential risks and challenges
                - Suggest mitigation strategies
                - Rate risks by severity and likelihood

                2. Project Schedule:
                - Break down into major phases
                - List key activities per phase
                - Define critical milestones
                - Consider sequence dependencies

                3. Resource Allocation:
                - Required personnel by role and skill
                - Equipment and machinery needs
                - Material requirements
                - Support services needed

                4. Budget Breakdown:
                - Labor costs by phase
                - Equipment and rental costs
                - Material costs
                - Contingency allocation

                Format the response as a structured JSON object."""


        
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
            "project_overview": {
                "title": string,
                "objective": string,
                "duration": number,
                "estimated_budget": number,
                "scope_summary": string
            },
            "milestones": [
                {
                    "title": string,
                    "target_date": string,
                    "dependencies": array,
                    "deliverables": array
                }
            ],
            "resources": {
                "personnel": array,
                "equipment": array,
                "materials": array,
                "peak_manning": number
            },
            "risk_assessment": {
                "high_risks": array,
                "mitigation_strategies": array
            },
            "critical_path": {
                "activities": array,
                "optimization_opportunities": array
            },
            "safety_plan": {
                "key_considerations": array,
                "required_permits": array,
                "safety_protocols": array
            },
            "innovation_opportunities": {
                "digital_tools": array,
                "modern_methods": array
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
            "project_overview": {
                "title": "Generated Plan",
                "scope_summary": response
            },
            "warning": "Response was not in expected format, minimal structuring applied"
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
            
            # Log raw response for debugging
            logger.info(f"Raw AI Response: {ai_response}")
            
            if isinstance(ai_response, AIMessage):
                content = ai_response.content
            else:
                content = str(ai_response)
                
            # Try to extract JSON from the response
            try:
                # Find JSON content between curly braces
                start_idx = content.find('{')
                end_idx = content.rfind('}') + 1
                if start_idx != -1 and end_idx != -1:
                    json_str = content[start_idx:end_idx]
                    # Load JSON with float values
                    return json.loads(json_str)
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
        """Update an existing plan"""
        plan = self.plan_repository.update(plan_id, updates)
        return plan.to_dynamodb_item() if plan else None

    def delete_plan(self, plan_id: str) -> bool:
        """Delete a plan"""
        return self.plan_repository.delete(plan_id)
