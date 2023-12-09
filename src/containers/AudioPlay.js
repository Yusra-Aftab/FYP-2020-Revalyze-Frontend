import React, { useRef } from 'react';


const AudioPlay = () => {
  const audioRef = useRef(null);

  
  // const mp3FileUrl = `${apiUrl}/media/audio_files/filename.mp3`;
  const audioFilePath = "public/Test2_summary.mp3"; // Relative path from the public directory

  const handlePlayButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };


  return (
    <div>
      <audio ref={audioRef} src={audioFilePath} controls />
      {/* <button onClick={handlePlayButtonClick}>Play</button> */}
    </div>
  );
};

export default AudioPlay;
