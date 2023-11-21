import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Settings from '../components/Dialog'

// import DragNdrop from "./DragNDrop.jsx"


function LandingPage() {
    const navigate = useNavigate()
    //const [pythonOutput, setPythonOutput] = useState(null)

    // submit file function
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
                const pythonOutput = response.data.output
                
                console.log('File upload success! Moving to the next page...')
                navigate('/results', { state:{pythonOutput} })
            } else {
                // if python fail, do I want to redirect to an error page? or alert box?
                console.error('Python script failed. Redirecting to error page...')
                navigate('/')
            }

        } catch (e) {
            console.error('Error:', e)

            // checks if the ERROR MESSAGE from the server matches
            if (e.response && 
                    e.response.data && 
                    e.response.data.error === 'Hey.... that\'s not python!') {     // submitted non-python file in the .zip file 
                alert("Hey.... that's not a python!\nPlease attach ONLY python files in your .zip file.")
            } else {
                alert('An error occurred during file upload.')
                //console.log('Error data: ', e.response.data)
            }
        }
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <title>Web Application</title>

            <div align="right" style={{ marginTop: "30px", marginRight: "50px" }}>
                <Settings imageType='history' />

                <Settings imageType='settings' />
            </div>

            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>
            <p style={{ fontSize: "28px" }}>Submit your files to begin plagiarism detection.</p>

            {/* dis was drag-drop :D
             
            <div className='section'>
                <DragNdrop onFilesSelected={setFiles} width="300px" height='200px'/>
            </div>
            */}

            <div style={{ marginTop: "200px" }}>
                <form action="/upload" method="post" encType="multipart/form-data" onSubmit={handleFileSubmit}>
                    <input type="file" name="files" accept=".zip" onChange={handleFileChange} />
                    <input type="submit" value="Upload file" />
                </form>
            </div>

        </div>
    )
}

export default LandingPage