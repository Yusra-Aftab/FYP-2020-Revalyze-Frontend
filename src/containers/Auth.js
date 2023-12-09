import React, { useState, useEffect } from 'react';
import '../style/Auth.css';
import axios from 'axios';

const Auth = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video names from your Django API
    axios.get(`${process.env.REACT_APP_API_URL}/get_videos/`)
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.error('Error fetching video names:', error);
      });
  }, []);

  return (
    <div className='container'>
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Revalyze</h1>
        <p className="lead">Transcription, summarization, and analysis of speeches and meetings.</p>
        <hr className="my-4" />

        {/* Heading for Recents */}
        <h2 className="mb-4">Recents</h2>

        {/* Display first six video names in the six boxes */}
        <div className="row">
          {videos.slice(0, 6).map((video, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="square-box">
                <p>{video.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
