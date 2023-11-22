import React, { useState } from 'react'
import axios from 'axios'


function CodeExclusionUpload() {
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

            const response = await axios.post('http://localhost:8000/uploadExcl', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.success) {
                alert('Success! Please proceed.')
            }

        } catch (e) {
            console.error('Error:', e)

            if (e.response) {
                console.log(e.response.data);

                // checks if the ERROR MESSAGE from the server matches
                if (e.response.data && e.response.data.error === 'Hey.... that\'s not python!') {
                    alert("Hey.... that's not a python!\nPlease attach ONLY python files in your .zip file.");
                } else {
                    alert('An error occurred during file upload.');
                    // Handle other error cases if needed
                }
            } else {
                // Handle cases where e.response is undefined
                alert('An error occurred during the request. Please check your network connection.');
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

export default CodeExclusionUpload