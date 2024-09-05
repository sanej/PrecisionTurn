import yaml

def get_tasks():
    with open('data/tasks.yaml', 'r') as file:
        tasks = yaml.safe_load(file)
    return tasks