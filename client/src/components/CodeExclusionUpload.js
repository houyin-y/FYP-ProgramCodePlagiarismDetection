import React from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function CodeExclusionUpload() {
    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await axios.post('http://localhost:8000/uploadExcl', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                if (response.data.success) {
                    alert('Success! Please proceed.')
                } else {
                    alert('Something went wrong! Please upload try again.')
                }

            } catch (error) {
                console.error('Error:', error)

                if (error.response) {
                    console.log(error.response.data);

                    // checks if the ERROR MESSAGE from the server matches
                    if (error.response.data && error.response.data.error === 'Hey.... that\'s not python!') {
                        alert("Hey.... that's not a python!\nPlease attach ONLY python files in your .zip file.")
                    } else {
                        alert('An error occurred during file upload.')
                    }
                } else {
                    alert('An error occurred during file upload.')
                }
            }
        }
    }


    return (
        <div>
            <form action="/upload" method="post" encType="multipart/form-data">
                <input type="file" name="files" accept=".zip" onChange={handleFileChange} style={{ display: 'none' }} id="upload-Excl" />
                <label htmlFor="upload-Excl">
                    <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                    </Button>
                </label>
            </form>
        </div>
    )
}

export default CodeExclusionUpload