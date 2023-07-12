from pymongo import MongoClient
import json
import time
import urllib.parse
import logging

# username = "vijaykumarp2f"
# password = "Vijaytulsi@007"

# # Escape the username and password
# escaped_username = urllib.parse.quote_plus(username)
# escaped_password = urllib.parse.quote_plus(password)

# Construct the MongoDB connection URL
mongo_url = f"mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(mongo_url)

# Access the database
db = client.get_database('COE_PARSER')

# Access the collection
collection = db['area_reports']

# # JSON data to be inserted
# json_data = [{"name": "John", "age": 30}, {"name": "Alice", "age": 25}]

# # Insert the JSON data into the collection
# collection.insert_many(json_data)

# Close the MongoDB connection
logging.basicConfig(filename='daemon_script.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode ='a')
def push_to_database(result,run_name):
    try:
        filename = f"run_files/{run_name}_{int(time.time())}.json"
        print("call-pre function called")
        logging.info("Parsing function called and pushed to MongoDB")
        # print(result)
        with open(filename, "w") as file:
            json.dump(result, file, indent=4)
        val= {"runName":run_name, "file_name":filename}
        collection.insert_one(val)
        return True
    except Exception as e:
        logging.ERROR("Error pushing data to DB")
        return False
    

def collect_data():
    data = list(collection.find())

    return data