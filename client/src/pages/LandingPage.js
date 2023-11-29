import React, { useState } from "react"
import PopUp from '../components/PopUp'
import FileUpload from '../components/FileUpload'


function LandingPage() {
    const [value, setValue] = useState(30)

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <title>Web Application</title>

            <div align="right" style={{ marginTop: "30px", marginRight: "50px" }}>
                <PopUp imageType='history' />

                <PopUp imageType='settings' onValueChange={setValue} />
            </div>

            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>
            <p style={{ fontSize: "28px", marginBottom: "120px" }}>
                Submit your files to begin plagiarism detection.
            <br /><br />
                <small style={{fontSize:"20px"}}>Please compile all your .py files into a .zip file, and upload ONE (1) .zip file.</small>
            </p>

            <FileUpload value={value} />

            <div style={{ position: 'fixed', right: '10px', bottom: '5px' }}>
                History and Settings icons by <a href="https://icons8.com/" style={{ color: "black" }}>Icons8</a> 
            </div>
        </div>
    )
}

export default LandingPage