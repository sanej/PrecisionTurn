# infrastructure/db/dynamodb.py
import boto3
from botocore.exceptions import ClientError
import logging
from typing import Dict, List, Optional
from infrastructure.config import AWS_PROFILE, AWS_REGION

logger = logging.getLogger(__name__)

class DynamoDBConnection:
    """Handles DynamoDB connection and basic operations"""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DynamoDBConnection, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        """Initialize DynamoDB connection"""
        try:
            self.session = boto3.Session(profile_name=AWS_PROFILE)
            self.dynamodb = self.session.resource('dynamodb', region_name=AWS_REGION)
        except Exception as e:
            logger.error(f"Failed to initialize DynamoDB connection: {str(e)}")
            raise

    def get_table(self, table_name: str):
        """Get DynamoDB table by name"""
        return self.dynamodb.Table(table_name)

    async def execute_transaction(self, operations: List[Dict]):
        """Execute a DynamoDB transaction"""
        try:
            return await self.dynamodb.meta.client.transact_write_items(
                TransactItems=operations
            )
        except ClientError as e:
            logger.error(f"Transaction failed: {str(e)}")
            raise