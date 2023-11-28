import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function FileSubmission({ value }) {
    const navigate = useNavigate()

    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            try {
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

            } catch (error) {
                console.error('Error:', error)

                // checks if the ERROR MESSAGE from the server matches
                if (error.response &&
                    error.response.data &&
                    error.response.data.error === 'Hey.... that\'s not python!') {     // submitted non-python file in the .zip file 
                    alert("Hey.... that's not a python!\nPlease attach ONLY python files in your .zip file.")
                } else if (error.message === 'Please include more than ONE(1) .py file in your .zip file.') {
                    alert('Please include more than ONE(1) .py file in your .zip file.')
                } else {
                    alert('An error occurred during file upload.')
                }
            }
        }
    }


    return (
        <div>
            <form action="/upload" method="post" encType="multipart/form-data">
                <input type="file" name="files" accept=".zip" onChange={handleFileChange} style={{ display: 'none' }} id="upload-button" />
                <label htmlFor="upload-button">
                    <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                    </Button>
                </label>
            </form>
        </div>
    )
}

export default FileSubmission