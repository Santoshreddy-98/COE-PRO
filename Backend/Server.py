from flask import Flask, jsonify, request
import logging
from flask_cors import CORS
from Directory_checker import FileParser
from Model.DB_Connect import collect_data
from pymongo import MongoClient
import json
import os
from bson import ObjectId

app = Flask(__name__)

mongo_url = f"mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(mongo_url)

# Access the database
db = client.get_database('COE_PARSER')

# Access the collection
collection = db['area_reports']

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['POST'])
def receive_data():
    if request.method == 'POST':
        # Process the received data
        data = request.json
        designName, runName, directory = data['designName'], data['runName'], data['directory']
        if directory:
            # Instantiate the FileParser object and call the main method
            parser = FileParser(directory, runName)
            parser.main()
            logging.info("File parser instantiated with directory: %s", directory)
            response = {
                'message': 'Data received successfully',
            }   
            return jsonify(response)
        else:
            logging.warning("No directory path found in MongoDB.")

@app.route('/api/getdata', methods=['GET'])
def get_data():
    # Retrieve data from the MongoDB collection
    send_data = collect_data()
    print(send_data)
    return jsonify(send_data)

@app.route('/api/get_data_by_id/<id>', methods=['GET'])
def get_data_by_id(id):
    id_value = ObjectId(id)
    data = collection.find_one({'_id': id_value})

    if data:
        file_name = data.get('file_name')

        # Search for the file in the local directory
        if os.path.isfile(file_name):
            # Read the JSON data from the file
            with open(file_name, 'r') as file:
                json_data = json.load(file)

            return jsonify(json_data)
        else:
            return jsonify({'error': 'File not found.'}), 404
    else:
        return jsonify({'error': 'Document not found.'}), 404

if __name__ == '__main__':
    app.run(debug=True)
