import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('name', name);

    axios.post(`${process.env.REACT_APP_API_URL}/upload_video/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data);
      // Handle the response from the server (e.g., display a success message).
    })
    .catch((error) => {
      console.error(error);
      // Handle errors from the server.
    });
  };

  return (
    <div className='container mt-5'>
      <h1>Transcribe Your Videos</h1>
      <div className='form-group'>
      <input className='form-control mt-3' type="file" accept=".mp3" onChange={handleFileChange} />
      </div>
      <div className='form-group'>
      <input
        className='form-control mt-3'
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={handleNameChange}
      />
      </div>
      <button className='btn btn-primary mt-3' onClick={handleUpload}>Upload and Transcribe</button>
    </div>
  );
}

export default FileUpload;
