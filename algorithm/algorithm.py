# referred to https://pygments.org/docs/tokens/ for the list of tokens
# to ensure that all the unwanted tokens are removed during data cleaning process

from pygments import lex
from pygments.lexers import PythonLexer
from pygments.token import Text, Comment, String, Keyword, Name
import numpy as np
from numpy.linalg import norm


### functions ###
# convert the program codes into tokens
def tokenize(code):
    # get lexer for Python code
    lexer = PythonLexer(stripAll=True)
    
    # tokenize the code
    tokens = list(lex(code, lexer))
    
    # data cleaning
    # remove whitespaces (space, tab, next line), comments (single-line comments and multi-line comments) and import statements (import, from)
    filtered_tokens = [
    (token1, token2) for token1, token2 in tokens
    if token1 not in {Text, Text.Whitespace, Comment.Single, String.Doc, Keyword.Namespace, Name.Namespace}
]

    return filtered_tokens
    
# convert the tokens into kgrams (value of k is a parameter)
def kgram(code, k):
    kgrams = []
    
    for i in range(len(code) - k + 1):
        nested_kgrams = [(code[i+j][0]) for j in range(k)]
        
        # a tuple is used because it will be used as a key in dictionary (create_ftable())
        nested_kgrams_tuple = (nested_kgrams[0], nested_kgrams[1])
        
        kgrams.append(nested_kgrams_tuple)
    
    return kgrams

# obtain the frequency of kgram terms in a document
def create_ftable(list):
    frequency_table = {}

    for item in list:
        if item in frequency_table:
            frequency_table[item] += 1
        else:
            frequency_table[item] = 1
    
    return frequency_table

# calculate the idf of the pair documents
def calc_idf(total_num_of_codes, kgram1, kgram2):
    """
    https://blog.devgenius.io/tfidf-calculation-from-scratch-applying-on-real-world-data-set-8e918ff876f0
    https://blog.devgenius.io/tfidf-calculation-using-sklearns-tfidfvectorizer-24476f03c594
    https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html
    https://towardsdatascience.com/how-sklearns-tf-idf-is-different-from-the-standard-tf-idf-275fa582e73d
    """    
    # frequency_of_kgram_term = {'kgram_term': frequency}
    frequency_of_kgram_term = {}
    
    # places all k-gram terms in a dictionary
    for kgram_term in (kgram1 + kgram2):
        if kgram_term not in frequency_of_kgram_term:
            frequency_of_kgram_term[kgram_term] = 0

    # check for number of documents that contain each k-gram term
    for kgram_term in frequency_of_kgram_term:
        if kgram_term in kgram1:
            frequency_of_kgram_term[kgram_term] += 1
        
        if kgram_term in kgram2:
            frequency_of_kgram_term[kgram_term] += 1
    

    # calculate idf; formula: log ((N + 1)/(df(t) + 1)) + 1
    # where N = total number of documents in corpus
    # df(t) = number of documents that contain the respective k-gram (within the pair document that is compared)
    
    # idf = {kgram_term: idf value}
    idf = {}
    
    for kgram_term in frequency_of_kgram_term:
        idf[kgram_term] = (np.log((total_num_of_codes + 1) / (frequency_of_kgram_term[kgram_term] + 1))) + 1

    return idf

# calculate normalised tf idf 
def calc_tfidf(freq_table, idf):
    # formula for tf-idf: (normalized tf * idf)
    
    # for normalized tf (kgram frequency / total sum of kgrams in document)
    total_sum_of_kgrams = 0
    
    for kgram_term in freq_table:
        total_sum_of_kgrams += freq_table[kgram_term]
    
    # normalised_tfidf = {kgram_term: normalised tfidf value}
    tfidf = {}
    
    # calculate normalised tfidf
    for kgram_term in freq_table:
        tfidf[kgram_term] = freq_table[kgram_term] * idf[kgram_term] / total_sum_of_kgrams

    return tfidf
        
# calculate the similarity of the pair documents using cosine similarity
def cosine_similarity(tfidf1, tfidf2):
    grand_total = {}
    
    # obtain dot product (multiply the tfidf of code1 and code2 against the same kgram terms)
    for kgram_term1 in tfidf1:
        for kgram_term2 in tfidf2:
            if (kgram_term1 == kgram_term2):
                grand_total[kgram_term2] = tfidf1[kgram_term1] * tfidf2[kgram_term2]
    
    
    sum_of_dot_product = 0
    
    for kgram_term in grand_total:
        sum_of_dot_product += grand_total[kgram_term]
    
    
    sum_of_squared_tfidf1 = 0
    sum_of_squared_tfidf2 = 0
    
    # sum of squared
    for kgram_term in tfidf1:
        sum_of_squared_tfidf1 += tfidf1[kgram_term]**2
        
    for kgram_term in tfidf2:
        sum_of_squared_tfidf2 += tfidf2[kgram_term]**2
    
    # cosine similarity
    # formula: (dot product of doc1 and doc2) / (sqrt(sum of squared doc1) * sqrt(sum of squared doc2))
    cosine = sum_of_dot_product / (np.sqrt(sum_of_squared_tfidf1) * np.sqrt(sum_of_squared_tfidf2))
    cosine = "{:.2f}%".format((cosine * 100))
    
    return cosine