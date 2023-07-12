import re
import json
import logging
from Model.A_Report import push_to_database

def parse_data(filename, index, subset,runName):
    logging.basicConfig(filename='parser_details.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode ='a')
    stack = []
    result = []

    with open(filename, 'r') as file:
        lines = file.readlines()[11:]
        
        for line in lines:
            match = re.match(r'^(\s+)(\w.*\d.*|\w.*)', line)

            if match:
                indentation = match.group(1)
                level = len(indentation) // 2
                elements = match.group(2).split()

                while len(stack) >= level:
                    stack.pop()

                node = {
                f"{subset[0]}": elements[index[0]],
                f"{subset[1]}":  elements[index[1]],
                f"{subset[2]}":  elements[index[2]],
                f"{subset[3]}":  elements[index[3]],
                f"{subset[4]}":  elements[index[4]],
                f"{subset[5]}":  elements[index[5]],
                "Sublevel": []
            }

                if stack:
                    current_level = stack[-1]
                    current_level['Sublevel'].append(node)
                else:
                    result.append(node)
                stack.append(node)
        logging.info(f"processed are file: {file}")
    res = push_to_database(result,runName)
    return res


def call_Preprocess(file_name, runName):
    logging.basicConfig(filename='parser_details.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode ='a')
    # file_name = "area_report_two.txt"

    with open(file_name, 'r') as file:
        lines = file.readlines()
        logging.info(f"Reading the file {file_name}")
        for line in lines:
            if re.match(r'^\s*Instance.*$', line):
                matching_line = line.strip()
                split_line = re.split(r'\s{2,}', matching_line)
                break

    data = [column.replace(' ', '_') for column in split_line]
    subset = ['Instance', 'Module', 'Cell_Count', 'Cell_Area', 'Net_Area', 'Total_Area']

    positions = [data.index(column) for column in subset]
    # logging.info(f"processed are file: {file}")
    return parse_data(file_name, positions, subset,runName)


