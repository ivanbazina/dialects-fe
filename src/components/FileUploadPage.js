import React, { useState } from "react";

function FileUploadPage(props) {
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);

        fetch(
        'http://167.71.3.43:3001/dialects/upload',
        // 'http://localhost:3001/dialects/upload',
        {
            method: 'POST',
            body: formData,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            props.getDialectsData();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
        <input type="file" name="file" onChange={changeHandler} />
        <div>
            <button onClick={handleSubmission}>Submit</button>
        </div>
        </div>
    )
}

export default FileUploadPage;