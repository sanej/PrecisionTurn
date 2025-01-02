# infrastructure/db/models/plan.py

from typing import Dict, Any, Optional
from datetime import datetime
import uuid
from decimal import Decimal
from infrastructure.utils.json_helper import decimal_to_float

class PlanModel:
    """Represents a Turnaround Plan in DynamoDB"""
    
    def __init__(
        self,
        title: str,
        status: str = "draft",
        details: Dict[str, Any] = None,
        plan_id: Optional[str] = None
    ):
        self.id = plan_id or str(uuid.uuid4())
        self.title = title
        self.status = status
        self.details = self._convert_floats_to_decimal(details or {})
        self.created_at = datetime.now().isoformat()
        self.updated_at = self.created_at

    def _convert_floats_to_decimal(self, obj: Any) -> Any:
        """Recursively convert float values to Decimal"""
        if isinstance(obj, float):
            return Decimal(str(obj))
        elif isinstance(obj, dict):
            return {k: self._convert_floats_to_decimal(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [self._convert_floats_to_decimal(item) for item in obj]
        return obj

    def to_dynamodb_item(self) -> Dict[str, Any]:
        """Convert to DynamoDB item format"""
        dynamodb_item = {
            'id': self.id,
            'title': self.title,
            'status': self.status,
            'details': self._convert_floats_to_decimal(self.details),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        return dynamodb_item

    def to_json(self) -> Dict[str, Any]:
        """Convert to JSON-serializable format"""
        return decimal_to_float(self.to_dynamodb_item())

    @classmethod
    def from_dynamodb_item(cls, item: Dict[str, Any]) -> 'PlanModel':
        """Create PlanModel from DynamoDB item"""
        return cls(
            title=item['title'],
            status=item['status'],
            details=item['details'],
            plan_id=item['id']
        )

    def update(self, updates: Dict[str, Any]) -> None:
        """Update plan attributes"""
        for key, value in updates.items():
            if hasattr(self, key):
                if key == 'details':
                    value = self._convert_floats_to_decimal(value)
                setattr(self, key, value)
        self.updated_at = datetime.now().isoformat()