'''
flow of the entire process
upload codes 
-> all the codes will be added into the corpus 
-> codes will be compared in pairs (need to create a function to perform this)
'''

import sys
# import algorithm
from generateCorpus import *


corpus = generateCorpus(sys.argv[1])

print(corpus)