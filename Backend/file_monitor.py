import os
import time
import logging
import json
import re
from areaParser import call_Preprocess

class FileParser:
    def __init__(self, directory,runName):
        self.directory = directory
        self.previous_files = []
        # self.processed_files_file = "processed_files.json"
        # self.load_processed_files()
        self.runName = runName

    # def load_processed_files(self):
    #     """Loads the list of processed files from the JSON file."""
    #     if os.path.exists(self.processed_files_file):
    #         with open(self.processed_files_file, "r") as f:
    #             self.previous_files = json.load(f)
                
            # print(self.previous_files)

    # def save_processed_files(self):
    #     """Saves the list of processed files to the JSON file."""
    #     with open(self.processed_files_file, "a") as f:
    #         json.dump(self.previous_files, f)
            
    def setup_logging(self):
        """Sets up the logging configuration."""
        # print('logger created')
        log_file = "parser_details.log"
        logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode='a')
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s')
        console_handler.setFormatter(formatter)
        logging.getLogger('').addHandler(console_handler)

    def check_directory(self, directory_path,runName):
    #  """Checks the input directory and processes new files/subdirectories that exist in that directory."""
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                val = re.search(r'.*area.*\.txt', file)
                if val:
                    file_path = os.path.join(root, file)
                    logging.info(f"{time.ctime()}\tFile: {file}")
                    if file not in self.previous_files:
                        # print("level2")
                        # logging.info(f"{time.ctime()}\tFile: {file}")
                        try:
                            success = call_Preprocess(file_path,runName)
                            if success:
                                logging.info(f"Processed area file: {file}")
                                # Mark the file as processed
                                self.previous_files.append(file)
                            else:
                                logging.error(f"Error processing area file: {file}.")
                        except Exception as e:
                            logging.error(f"Error processing area file: {file}. Error: {str(e)}")

        print(self.previous_files)
        # Save the updated list of processed files
        # self.save_processed_files()

    def main(self):
        """The main function that runs the daemon script."""
        self.setup_logging()
        logging.info("Parser script started.")
        # logging.basicConfig(filename='daemon_script.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode ='a')
        self.check_directory(self.directory,self.runName)
        logging.info("End of Run")

