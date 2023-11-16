'''
this file generates the corpus, it takes in the path of the submitted .zip file
extract the .zip file into a folder, then reads each folder into the corpus (an array)

DO NOTE: this file can only be run through the server due to a difference in working directory, which causes the relative links to be different
'''

import zipfile
import os


def generateCorpus(zipFilePath):

    # define the file path of the .zip file and folder path where it will be extracted to
    zip_file_path = zipFilePath
    extracted_folder_path = "../algorithm/extracted_folder"

    # remove all files in extracted_folder
    file_names = os.listdir(extracted_folder_path)

    for file_name in file_names:
        file_path = extracted_folder_path + '/' + file_name
        if os.path.isfile(file_path):
            os.remove(file_path)

    # extract the .zip file and save it locally
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extracted_folder_path)

    # store each file into an array (corpus)
    file_names = os.listdir(extracted_folder_path)
    corpus = []

    for file_name in file_names:
        file_path = extracted_folder_path + '/' + file_name

        # read each file into a variable
        with open (file_path, 'r', encoding='utf-8') as file:
            corpus.append(file.read().replace('\n', ''))

    return corpus