'''
flow of the entire process
upload codes 
-> all the codes will be added into the corpus 
-> codes will be compared in pairs (need to create a function to perform this)
'''

import sys
import algorithm as algo
import miscFunctions as gc


corpus, numOfFiles = gc.generateCorpus(sys.argv[1])

#print(corpus, numOfFiles)

'''
-> (1) perform tokenization (+ data cleaning)
-> (2) create kgrams
-> (3) create frequency table

=> (4) calculate IDF (inverse document frequency)
=> (5) calculate TF-IDF (term frequency multiply inverse document frequency)
=> (6) calculate cosine similarity
'''

all_tokens = []
all_kgrams = {}
all_ftables = []

for i, code in enumerate(corpus):
    # (1) perform tokenization
    tokens = algo.tokenize(code)

    # (2) create k-grams; where the 2nd argument is the k-value
    kgrams = algo.kgram(tokens, 2)

    # (3) create frequency table
    ftable = algo.create_ftable(kgrams)

    # append everything to list
    all_tokens.append(tokens)
    all_kgrams.update({i: kgrams})
    all_ftables.append(ftable)

# (4) calculate IDF (inverse document frequency)
pairs = gc.createPairs(all_kgrams)

# pair here refers to the number that represents the kgram 
# e.g., (1, 2) is a pair where 1 and 2 refers to the position of their respective codes in all_tokens/all_kgrams/all_ftables
# have to -1 because list starts counting from 0
for pair in pairs:
    idf = algo.calc_idf(len(corpus), all_kgrams[pair[0]], all_kgrams[pair[1]])

    tfidf1 = algo.calc_tfidf(all_ftables[pair[0]], idf)
    tfidf2 = algo.calc_tfidf(all_ftables[pair[1]], idf)
                             
    cosine_similarity = algo.cosine_similarity(tfidf1, tfidf2)
    print(f'Similarity: {cosine_similarity}')