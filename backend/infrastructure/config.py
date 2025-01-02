# infrastructure/config.py

import os
from dotenv import load_dotenv

load_dotenv()

# AWS Configuration
AWS_PROFILE = os.getenv('AWS_PROFILE', 'PrecisionTurn-Dev')
AWS_REGION = os.getenv('AWS_REGION', 'us-east-2')

# DynamoDB Tables
DYNAMODB_TABLES = {
    'PLANS': 'TurnaroundPlans'
}