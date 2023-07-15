import os
import time
import logging
import re
import json
from area_report_Parser import call_Preprocess

class FileParser:
    def __init__(self, directory, runName):
        self.directory = directory
        self.previous_files = self.load_processed_files()
        self.runName = runName
        self.setup_logging()

    def load_processed_files(self):
        """Loads the list of processed files from a JSON file, if it exists."""
        processed_files_file = "processed_files.json"
        if os.path.exists(processed_files_file):
            with open(processed_files_file, "r") as f:
                return json.load(f)
        return []

    def save_processed_files(self):
        """Saves the list of processed files to a JSON file."""
        processed_files_file = "processed_files.json"
        with open(processed_files_file, "w") as f:
            json.dump(self.previous_files, f)

    def setup_logging(self):
        """Sets up the logging configuration."""
        logging.basicConfig(filename="parser_details.log", level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode='a')

    def check_directory(self):
        """Checks the input directory and processes new files/subdirectories that exist in that directory."""
        for root, dirs, files in os.walk(self.directory):
            for file in files:
                if re.match(r'.*area.*\.txt', file):
                    file_path = os.path.join(root, file)
                    logging.info(f"{time.ctime()}\tFile: {file}")
                    if file not in self.previous_files:
                        try:
                            success = call_Preprocess(file_path, self.runName)
                            if success:
                                logging.info(f"Processed area file: {file}")
                                self.previous_files.append(file)  # Mark the file as processed
                            else:
                                logging.error(f"Error processing area file: {file}.")
                        except Exception as e:
                            logging.error(f"Error processing area file: {file}. Error: {str(e)}")

        self.save_processed_files()

    def main(self):
        """The main function that runs the parser script."""
        logging.info("Parser script started.")
        self.check_directory()
        logging.info("End of Run")

