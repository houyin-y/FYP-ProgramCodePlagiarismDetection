# FYP-ProgramCodePlagiarismDetection

## Program Code Plagiarism Detection System 


### Final Year Project for BSc (Hons) in Computer Science
Plagiarism in the recent years have become more rampant than ever, this is mainly because students have access to a wide variety of resources.  Hence, certain students does not feel the need to study and resorted to plagiarism. Program codes, unlike written literature and other creative content such as music and drawings, are significantly more difficult to detect plagiarism. Hence, lecturers are required to go through every submitted program code, due to the unreliability and to protect the confidentiality of the students' works. 

In an effort to reduce the workload of the lecturers at Sunway University, I have decided to develop a program code plagiarism detection system that is capable of detecting likely cases of plagiarism. The system only detects the similarity of program codes, lecturers will determine if it is indeed plaigiarised upon further checking.   

## Algorithm
### Tokenization
The program codes are converted into tokens using Pygments.

### Data Cleaning
Based on the token types in Pygments, whitespaces and comments are filtered out.

### Comparison
- K-gram
The tokens are represented by k-grams.

- Cosine similarity
The similarity rate will be calculated using cosine similarity. 


## Tech Stack
- Python
  - Pygments
  - Numpy
- Express JS (wip)
- React JS (wip)
- Node JS (wip)
