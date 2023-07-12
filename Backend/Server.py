from flask import Flask, jsonify, request
import logging
from flask_cors import CORS
from file_monitor import FileParser
from  Model.A_Report import collect_data

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['POST'])
def receive_data():
    if request.method == 'POST':
        print("server level")
        data = request.json
        # Process the received data
        designName, runName, directory = data['designName'], data['runName'], data['directory']
        if directory:
            print("serever level 2")
        # Instantiate the DaemonScript object and call the main method
            parser = FileParser(directory,runName)
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
        

if __name__ == '__main__':
    app.run(debug=True)

