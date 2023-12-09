import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const audioRef = useRef(null);

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

  const handleVideoClick = (videoId) => {
    // Fetch the transcript and audio URL for the selected video by ID
    axios.get(`${process.env.REACT_APP_API_URL}/get_transcript/${videoId}/`)
      .then((response) => {
        setSelectedVideo(response.data);
        console.log(response.data);
        const audioUrl = `/backend${response.data.audio_url}`;
        console.log(audioUrl);
      })
      .catch((error) => {
        console.error('Error fetching transcript:', error);
        setSelectedVideo(null);
      });
  };

  const handlePlayButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="container mt-5">
      <h1>Transcription List</h1>
      <div className="row">
        <div className="col-4">
          <ul className="nav nav-pills flex-column">
            {Array.isArray(videos) && videos.length > 0 ? (
              videos.map((video) => (
                <li
                  key={video.id}
                  className="nav-item"
                >
                  <button
                    className="nav-link border mb-2 mt-2"
                    onClick={() => handleVideoClick(video.id)}
                  >
                    {video.name}
                  </button>
                </li>
              ))
            ) : (
              <p>No videos to display.</p>
            )}
          </ul>
        </div>
        <div className="col-8">
          {selectedVideo ? (
            <div>
              <h3>{selectedVideo.name}</h3>
              <p>{selectedVideo.transcript}</p>
              {selectedVideo.audio_url && (
                <div>
                  <audio ref={audioRef} src={selectedVideo.audio_url} controls />
                  <button onClick={handlePlayButtonClick}>Play</button>
                </div>
              )}
            </div>
          ) : (
            <p>Select a video from the list to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoList;
