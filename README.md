# Program Code Plagiarism Detection System 
Final Year Project – BSc (Hons) in Computer Science, Sunway University

## 🚀 Overview 
Plagiarism has become increasingly prevalent in academic environments due to the abundance of online resources. Unlike traditional forms of creative work such as essays or artwork, detecting plagiarism in program code is more challenging. Manual checks by lecturers are time-consuming and can be prone to error, especially when ensuring the confidentiality of student work.

To address this issue, I developed a **Program Code Plagiarism Detection System** 🧠💻 aimed at assisting lecturers in identifying potential plagiarism in programming assignments. The system focuses on detecting code similarity—final decisions on plagiarism are left to the lecturers' discretion after review.

## ✨ Features
- ⚙️ Automatic comparison of submitted code files
- 🧹 Tokenization and preprocessing to normalize code
- 📊 Detection of structural similarity using k-grams and cosine similarity
- 🖥️ User-friendly interface for uploading and reviewing files
- 🔌 Modular backend with API support for easy integration

## 🧪 Algorithm & Methodology 
1. 🏷️ Tokenization
   - Source code is tokenized using Pygments, a syntax highlighting tool that recognizes language-specific elements.
    
2. 🧼 Data Cleaning
   - Non-essential elements such as whitespaces and comments are removed to focus on the code's core logic and structure.
  
3. 🔍 Similarity Comparison
   - K-gram Technique: Tokens are grouped into overlapping substrings (k-grams) to retain structure.
    - Cosine Similarity: The similarity score between two code submissions is calculated using cosine similarity on the vectorized k-grams.

## 🛠️ Tech Stack
### Backend
- **Python** 🐍 – For code parsing, preprocessing, and similarity detection
- **Node.js & Express.js** ⚙️ – RESTful API and file handling

### Frontend
- **React.js** ⚛️ – Interactive and modern user interface

## 📦 Dependencies
### Python
- `pygments` – Tokenization
- `numpy` – Vector math for similarity calculation

### Node.js
- `adm-zip`
- `cors`
- `express`
- `multer` – File uploads
- `path`

### React
- `axios` – API requests
- `react-router-dom` – Routing
- `@mui/material, @mui/icons-material` – UI components
- `@emotion/react, @emotion/styled` – Styling

## 🧑‍🏫 Usage
1. 📁 Upload code files via the web interface.
2. ⚙️ The system processes the files and computes similarity scores.
4. 🔍 Review flagged results for further manual inspection

## ⚠️ Notes
- This tool is designed to assist academic staff, not to automate the accusation of plagiarism.
- The results indicate potential similarity; human validation is essential.
