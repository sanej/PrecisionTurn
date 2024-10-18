import os
import openai
from datetime import datetime

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_project_plan(plan_details):
    prompt = f"""Create a detailed project plan based on the following details: {plan_details}
    Include the following sections in a JSON format:
    {{
        "Project_Overview": {{
            "Duration": "",
            "Estimated_Budget": "",
            "Objective": "",
            "Title": ""
        }},
        "Key_Milestones": [
            {{"Date": "", "Milestone": ""}},
        ],
        "Detailed_Task_Breakdown": [
            {{"Duration": "", "Name": "", "Start_Date": ""}},
        ],
        "Resource_Allocation": {{
            "Equipment": "",
            "Labor": "",
            "Materials": "",
            "Utilities_and_Services": ""
        }},
        "Risk_Assessment_and_Mitigation_Strategies": {{
            "Cost_Overruns": "",
            "Mechanical_Failure": "",
            "Safety_Incidents": "",
            "Schedule_Delays": ""
        }},
        "Safety_Considerations": {{
            "Policies": "",
            "Training": ""
        }},
        "Environmental_Compliance_Measures": {{
            "Emissions": "",
            "Waste_Management": "",
            "Water_Treatment": ""
        }},
        "Quality_Control_Procedures": {{
            "Auditing": "",
            "Certification": "",
            "Documentation": "",
            "Inspection": ""
        }},
        "Stakeholder_Communication_Plan": {{
            "Engagement": "",
            "Meetings": "",
            "Updates": ""
        }},
        "Budget_Estimation": {{
            "Contingency": "",
            "Direct_Costs": "",
            "Indirect_Costs": "",
            "Total_Estimate": ""
        }}
    }}
    Ensure all text values are concise and each array has at least 3 items.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are an expert in refinery turnaround planning."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content