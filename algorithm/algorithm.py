# referred to https://pygments.org/docs/tokens/ for the list of tokens
# to ensure that all the unwanted tokens are removed during data cleaning process

from pygments import lex
from pygments.lexers import PythonLexer
from pygments.token import Text, Comment, String
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
    # remove whitespaces (space, tab, next line) and comments (single-line comments and multi-line comments)
    filtered_tokens = [(token1, token2) for token1, token2 in tokens if (token1 != Text and token1 != Text.Whitespace and token1 != Comment.Single and token1 != String.Doc)]
    
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
        placeholder = (np.log((total_num_of_codes)/(frequency_of_kgram_term[kgram_term])))
        #placeholder = placeholder.astype(float)
        
        idf[kgram_term] = placeholder

    return idf

# calculate normalised tf idf 
def calc_tfidf(freq_table, idf):
    # formula for normalised tf-idf: (frequency * idf)/sqrt(Σidf^2)
    # Σidf^2 = sum of every idf within the document squared
    
    # normalised_tfidf = {kgram_term: normalised tfidf value}
    normalised_tfidf = {}
    sum_of_squared_idf = 0
    
    # square then sum every idf within the document
    for kgram_term in idf:
        sum_of_squared_idf += idf[kgram_term]
    
    # calculate normalised tfidf
    for kgram_term in freq_table:
        tfidf = freq_table[kgram_term] * idf[kgram_term]
        
        normalised_tfidf[kgram_term] = (tfidf * np.sqrt(sum_of_squared_idf))

    return normalised_tfidf
        
# calculate the similarity of the pair documents using cosine similarity
def cosine_similarity(doc1, doc2):
    # transfer the tfidf values to a list for easy access
    tfidf1 = []
    tfidf2 = []
    
    for kgram_term in doc1:
        tfidf1.append(doc1[kgram_term])
    
    for kgram_term in doc2:
        tfidf2.append(doc2[kgram_term])
    
    # ensure that both arrays are of the same length for dot product
    min_length = min(len(tfidf1), len(tfidf2))
    
    if len(tfidf1) != min_length:
        tfidf1 = tfidf1[0:min_length]
    elif len(tfidf2) != min_length:
        tfidf2 = tfidf2[0:min_length]
    
    # cosine similarity
    # formula: (dot product of doc1 and doc2) / (sqrt(sum of squared doc1) * sqrt(sum of squared doc2))
    cosine = (np.dot(tfidf1, tfidf2) / norm(tfidf1) * norm(tfidf2))
    
    return cosine

"""
def tfidf(corpus):
    # initialize the tf-idf vectorizer
    vectorizer = TfidfVectorizer()
    
    # vectorize the document
    tfidf_matrix = vectorizer.fit_transform(corpus)
    
    # access vectorized values
    feature_names = vectorizer.get_feature_names_out()
    tfidf_values = tfidf_matrix.toarray()
    
    # final output
    #df = pd.DataFrame(tfidf_values, columns=feature_names)
    
    return feature_names, tfidf_values
"""