# infrastructure/db/repositories/plan_repository.py

from typing import List, Optional, Dict, Any
from infrastructure.db.dynamodb import DynamoDBConnection
from infrastructure.db.models.plan import PlanModel
from infrastructure.config import DYNAMODB_TABLES
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger(__name__)

class PlanRepository:
    def __init__(self):
        self.db = DynamoDBConnection()
        self.table = self.db.get_table(DYNAMODB_TABLES['PLANS'])

    def create(self, plan: PlanModel) -> PlanModel:
        """Save a new plan to DynamoDB"""
        try:
            item = plan.to_dynamodb_item()
            logger.info(f"Saving plan to DynamoDB: {item}")
            self.table.put_item(Item=item)
            return plan
        except ClientError as e:
            logger.error(f"ClientError in create: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Failed to save plan: {str(e)}")
            raise

    def get(self, plan_id: str) -> Optional[PlanModel]:
        """Retrieve latest version of a plan by ID"""
        try:
            logger.info(f"Fetching plan with ID: {plan_id}")
            response = self.table.query(
                KeyConditionExpression='id = :id',
                ExpressionAttributeValues={':id': plan_id},
                Limit=1,
                ScanIndexForward=False  # Latest first
            )
            
            items = response.get('Items', [])
            return PlanModel.from_dynamodb_item(items[0]) if items else None
            
        except Exception as e:
            logger.error(f"Failed to retrieve plan: {str(e)}")
            raise

    def list(self, limit: int = 50) -> List[PlanModel]:
        """List all plans"""
        try:
            response = self.table.scan(Limit=limit)
            return [PlanModel.from_dynamodb_item(item) for item in response.get('Items', [])]
        except Exception as e:
            logger.error(f"Failed to list plans: {str(e)}")
            raise

    def update(self, plan_id: str, updates: Dict[str, Any]) -> Optional[PlanModel]:
        """Update a plan"""
        try:
            plan = self.get(plan_id)
            if not plan:
                return None
                
            plan.update(updates)
            item = plan.to_dynamodb_item()
            self.table.put_item(Item=item)
            return plan
        except Exception as e:
            logger.error(f"Failed to update plan: {str(e)}")
            raise

    def delete(self, plan_id: str) -> bool:
        """Delete a plan"""
        try:
            self.table.delete_item(Key={'id': plan_id})
            return True
        except Exception as e:
            logger.error(f"Failed to delete plan: {str(e)}")
            raise