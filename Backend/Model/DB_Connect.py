from pymongo import MongoClient
import json
import time
import logging

# MongoDB connection URL
mongo_url = f"mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority"
# Connect to MongoDB
client = MongoClient(mongo_url)
# Access the database
db = client.get_database('COE_PARSER')
# Access the collection
collection = db['area_reports']
# Configure logging
logging.basicConfig(filename='parser_details.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode='a')

def push_to_database(result, run_name):
    """
    Pushes the parsed data to the MongoDB collection.
    Args:
        result (list): The parsed data to be pushed.
        run_name (str): The name of the current run.
    Returns:
        bool: True if data is pushed successfully, False otherwise.
    """
    try:
        # Generate a unique filename with timestamp
        filename = f"run_files/{run_name}_{int(time.time())}.json"
        
        # Write the parsed data to a JSON file
        with open(filename, "w") as file:
            json.dump(result, file, indent=4)
        
        # Create a document to be inserted in the collection
        document = {"runName": run_name, "file_name": filename}
        
        # Insert the document into the collection
        collection.insert_one(document)
        
        return True
    except Exception as e:
        logging.error("Error pushing data to DB")
        return False

def collect_data():
    """
    Collects the data from the MongoDB collection.
    Returns:
        list: The collected data from the collection.
    """
    data = list(collection.find())
    return data
