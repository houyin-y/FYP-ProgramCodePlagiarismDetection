'''
this file generates the corpus, it takes in the path of the submitted .zip file
extract the .zip file into a folder, then reads each folder into the corpus (an array)

DO NOTE: this file can only be run through the server due to a difference in working directory, which causes the relative links to be different
'''

import zipfile
import os
from itertools import combinations


# stores files locally
def storeCodes(zip_file_path, extracted_folder_path):
    # remove all files in extracted_folder
    file_names = os.listdir(extracted_folder_path)

    for file_name in file_names:
        file_path = extracted_folder_path + '/' + file_name
        if os.path.isfile(file_path):
            os.remove(file_path)

    # extract the .zip file and save it locally
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extracted_folder_path)

def getCodes(extracted_folder_path):
    # store each file into an array (corpus)
    file_names = os.listdir(extracted_folder_path)
    corpusWithNames = {}

    for file_name in file_names:
        file_path = os.path.join(extracted_folder_path, file_name)

        if os.path.isfile(file_path) and file_name.endswith('.py'):

            # read each file into a variable
            with open (file_path, 'r', encoding='utf-8') as file:
                corpusWithNames[file_name] = file.read()

    return corpusWithNames

# generate corpus (a list) which stores all of the codes into elements
def generateCorpus(zip_file_path, extracted_folder_path):

    ### handle .py files ###
    # store the .py files locally
    storeCodes(zip_file_path, extracted_folder_path)

    # store each .py file into an array (corpus)
    corpusWithNames = getCodes(extracted_folder_path)

    
    ### handle code exclusion ###
    cleanCorpusWithNames = {}

    # checks if there are any codes submitted for code exclusion
    extracted_code_exclusion_folder = '../algorithm/extracted_folder/code_exclusion'

    if (len(os.listdir(extracted_code_exclusion_folder)) > 0):
        excludedCodes = getExcludedCodes()

        ### !!! NOTEEEE each file submitted for code exclusion will be placed in different elements of the array excludedCodes
        
        ## I THINK NEED TO FOR LOOP EXCLUDED CODES FIRST BARU CORPUS WITH NAMES ##
        
        for excludedCode in excludedCodes:
        
            for codeWithNames in corpusWithNames:
                pyCode = corpusWithNames[codeWithNames]

                if excludedCode in pyCode:
                    pyCode = pyCode.replace(excludedCode, "")
                    cleanCorpusWithNames[codeWithNames] = pyCode
                else:
                    cleanCorpusWithNames[codeWithNames] = corpusWithNames[codeWithNames]

    else:
        cleanCorpusWithNames = corpusWithNames

    return corpusWithNames, cleanCorpusWithNames

# split all the codes within the corpus into non-repeating pairs (e.g., A B C -> AB, BC, CD)
def createPairs(corpus):
    pairs = list(combinations(corpus, 2))

    return pairs


### code exclusion ###

# delete all files within the extracted excluded codes folder
def deleteExcludedCodes():
    extracted_folder_path = "../algorithm/extracted_folder/code_exclusion"

    # remove all files in extracted_folder
    file_names = os.listdir(extracted_folder_path)

    for file_name in file_names:
        file_path = extracted_folder_path + '/' + file_name
        if os.path.isfile(file_path):
            os.remove(file_path)

# saves the (codes to be excluded) locally
def storeExcludedCodes(zipFilePath):
    storeCodes(zipFilePath, '../algorithm/extracted_folder/code_exclusion')
    
# stores the (codes to be excluded) in an array called excludedCodes
def getExcludedCodes():
    excludedCodesWithNames = getCodes('../algorithm/extracted_folder/code_exclusion')

    excludedCodes = []

    for codeWithNames in excludedCodesWithNames:
        excludedCodes.append(excludedCodesWithNames[codeWithNames])

    return excludedCodes