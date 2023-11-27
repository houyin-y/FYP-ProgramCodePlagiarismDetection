import React, { useState } from "react"
import PopUp from '../components/PopUp'
import FileUpload from '../components/FileUpload'

// import DragNdrop from "./DragNDrop.jsx"


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
            <p style={{ fontSize: "28px", marginBottom: "200px" }}>Submit your files to begin plagiarism detection.</p>

            {/* dis was drag-drop :D
             
            <div className='section'>
                <DragNdrop onFilesSelected={setFiles} width="300px" height='200px'/>
            </div>
            */}

            <FileUpload value={value} />

        </div>
    )
}

export default LandingPage