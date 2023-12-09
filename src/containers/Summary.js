// Summary.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Summary() {
  const [summaries, setSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch summary names from your Django API
    axios.get(`${process.env.REACT_APP_API_URL}/get_names/`)
      .then((response) => {
        setSummaries(response.data.summaries);
      })
      .catch((error) => {
        console.error('Error fetching summary names:', error);
      });
  }, []);

  const handleSummaryClick = (summaryId) => {
    // Fetch the summary content for the selected summary by ID
    axios.get(`${process.env.REACT_APP_API_URL}/get_summary/${summaryId}/`)
      .then((response) => {
        setSelectedSummary(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Summary:', error);
        setSelectedSummary(null);
      });
  };

  const handlePlayButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };


  return (
    <div className="container mt-5">
      <h1>Summary List</h1>
      <div className="row">
        <div className="col-4">
          <ul className="nav nav-pills flex-column">
            {Array.isArray(summaries) && summaries.length > 0 ? (
              summaries.map((summary) => (
                <li
                  key={summary.id}
                  className="nav-item"
                >
                  <button
                    className="nav-link border mb-2 mt-2"
                    onClick={() => handleSummaryClick(summary.id)}
                  >
                    {summary.name}
                  </button>
                </li>
              ))
            ) : (
              <p>No summary to display.</p>
            )}
          </ul>
        </div>
        <div className="col-8">
          {selectedSummary ? (
            <div>
              <h3>{selectedSummary.name}</h3>
              <p>{selectedSummary.summary}</p>
              {selectedSummary.audio_url && (
                <div>
                <audio ref={audioRef} src={selectedSummary.audio_url}controls />
                <button onClick={handlePlayButtonClick}>Play</button>
              </div>
              )}
            </div>
          ) : (
            <p>Select a summary from the list to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
