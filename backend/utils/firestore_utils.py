import logging
from google.cloud import firestore
import json

# Specify the database name
db = firestore.Client(database='turnaround-plans')
PLANS_COLLECTION = 'plans-collection'  # Define the collection name

def store_plan(plan_data, metadata=None):
    logging.info("Storing plan data")
    doc_ref = db.collection(PLANS_COLLECTION).document()
    logging.info("Document reference created")
    data = json.loads(plan_data) if isinstance(plan_data, str) else plan_data
    if metadata:
        data['metadata'] = metadata
    data['created_at'] = firestore.SERVER_TIMESTAMP
    doc_ref.set(data)
    return doc_ref.id

def retrieve_plan(plan_id):
    doc_ref = db.collection(PLANS_COLLECTION).document(plan_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    return None

def update_plan(plan_id, updated_data):
    doc_ref = db.collection(PLANS_COLLECTION).document(plan_id)
    doc_ref.update(updated_data)

def delete_plan(plan_id):
    db.collection(PLANS_COLLECTION).document(plan_id).delete()

def convert_to_serializable(obj):
    if obj == firestore.SERVER_TIMESTAMP:
        return 'SERVER_TIMESTAMP'
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")