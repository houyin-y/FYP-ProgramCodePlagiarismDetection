import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function FileSubmission({ value }) {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault()

        // checks if the submitted file is a file
        if (!selectedFile) {
            alert('Please select a file')
            return
        }

        // adds file to formData
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            alert('submitted')

            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data.success) {
                // redirect if python succeed 
                const pythonOutput = response.data.pythonOutput
                const corpus = response.data.corpus

                if (!pythonOutput || pythonOutput.trim() === '') {
                    throw new Error('Please include more than ONE(1) .py file in your .zip file.')
                }
                
                console.log('File upload success! Moving to the next page...')
                navigate('/results', { state: { pythonOutput, corpus, value } })
            } else {
                console.error('Python script failed.')
                alert('Python script failed. Please check the submitted files and try again.')
            }

        } catch (e) {
            console.error('Error:', e)

            // checks if the ERROR MESSAGE from the server matches
            if (e.response &&
                e.response.data &&
                e.response.data.error === 'Hey.... that\'s not python!') {     // submitted non-python file in the .zip file 
                alert("Hey.... that's not a python!\nPlease attach ONLY python files in your .zip file.")
            } else if (e.message === 'Please include more than ONE(1) .py file in your .zip file.') {
                alert('Please include more than ONE(1) .py file in your .zip file.')
            } else {
                alert('An error occurred during file upload.')
            }
        }
    }

    return (
        <div>
            <form action="/upload" method="post" encType="multipart/form-data" onSubmit={handleFileSubmit}>
                <input type="file" name="files" accept=".zip" onChange={handleFileChange} />
                <input type="submit" value="Upload file" />
            </form>
        </div>
    )
}

export default FileSubmission