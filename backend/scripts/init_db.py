import os
import json

def init_database():
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Initialize contents.json if it doesn't exist
    contents_file = 'data/contents.json'
    if not os.path.exists(contents_file):
        with open(contents_file, 'w') as f:
            json.dump({}, f)
    
    # Initialize licenses.json if it doesn't exist
    licenses_file = 'data/licenses.json'
    if not os.path.exists(licenses_file):
        with open(licenses_file, 'w') as f:
            json.dump({}, f)
    
    print("Database initialized successfully!")

if __name__ == '__main__':
    init_database() 