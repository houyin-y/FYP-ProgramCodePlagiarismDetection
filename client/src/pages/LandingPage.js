import React, { useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import historyImage from "../img/icons8-browser-history-100.png"
import settingsImage from "../img/icons8-settings-100.png"


// import DragNdrop from "./DragNDrop.jsx"



function LandingPage() {
    //const history = useHistory()

    // useState hook for receiving input files
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        // append every file to formData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            alert('submitted')
            console.log(formData.getAll('files'));

            await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            // masuk new page
            console.log('File(s) upload success! Moving to new page...')
            //history.push('/progress')

        } catch (e) {
            console.error('Error:', e);
            console.log('Error response:', e.response.data);
        }
    }

    // CSS styles
    const buttonStyle = {
        backgroundColor: "rgba(255,255,255,0.5)",
        border: "None",
        marginRight: "25px"
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <title>Web Application</title>

            <div align="right" style={{ marginTop: "30px", marginRight: "50px" }}>
                <Link to="/" style={buttonStyle}>
                    <img src={historyImage} alt="history icon" width="60" />
                </Link>

                <Link to="/" style={buttonStyle}>
                    <img src={settingsImage} alt="settings icon" width="60" />
                </Link>
            </div>

            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>
            <p style={{ fontSize: "28px" }}>Submit your files to begin plagiarism detection.</p>

            {/** 
            <div className='section'>
                <DragNdrop onFilesSelected={setFiles} width="300px" height='200px'/>
            </div>
            */}

            <div style={{ marginTop: "200px" }}>
                <form action="/upload" method="post" encType="multipart/form-data" onSubmit={handleFileSubmit}>
                    <input type="file" name="files" accept=".zip" onChange={handleFileChange} multiple />
                    <input type="submit" value="Upload file" />
                </form>
            </div>

        </div>
    )
}

export default LandingPage