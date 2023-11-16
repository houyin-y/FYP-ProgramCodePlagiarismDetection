'''
this file generates the corpus, it takes in the path of the submitted .zip file
extract the .zip file into a folder, then reads each folder into the corpus (an array)
'''

import zipfile
import os


def generateCorpus(zipFilePath):
    # extract the .zip file and save it locally 
    zip_file_path = zipFilePath
    extracted_folder = "./algorithm/extracted_folder"

    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extracted_folder)

    # store each file into an array (corpus)
    file_names = os.listdir(extracted_folder)
    corpus = []

    for file_name in file_names:
        file_path = './algorithm/extracted_folder/' + file_name

        # read each file into a variable
        with open (file_path, 'r') as file:
            corpus.append(file.read())

    return corpus




from pathlib import Path
import sys

#print(sys.argv[1])
#print(Path.cwd())

path = './server/uploads/fakes.zip'
print(generateCorpus(path))