// Analysis.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Analysis() {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Fetch analysis names from your Django API
    axios.get(`${process.env.REACT_APP_API_URL}/get_analysis_names/`)
      .then((response) => {
        setAnalyses(response.data.analyses);
      })
      .catch((error) => {
        console.error('Error fetching analysis names:', error);
      });
  }, []);

  const handleAnalysisClick = (analysisId) => {
    // Fetch the analysis content for the selected analysis by ID
    axios.get(`${process.env.REACT_APP_API_URL}/get_analysis/${analysisId}/`)
      .then((response) => {
        setSelectedAnalysis(response.data);
        setReport(null); // Reset the report when a new analysis is selected
      })
      .catch((error) => {
        console.error('Error fetching Analysis:', error);
        setSelectedAnalysis(null);
        setReport(null);
      });
  };

  const handleViewReport = () => {
    if (selectedAnalysis) {
      // Fetch the report content for the selected analysis name
      axios.get(`${process.env.REACT_APP_API_URL}/get_report/${selectedAnalysis.name}/`)
        .then((response) => {
          setReport(response.data);
        })
        .catch((error) => {
          console.error('Error fetching report:', error);
          setReport(null);
        });
    } else {
      console.error('No analysis selected to view the report.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Analysis List</h1>
      <div className="row">
        <div className="col-4">
          <ul className="nav nav-pills flex-column">
            {Array.isArray(analyses) && analyses.length > 0 ? (
              analyses.map((analysis) => (
                <li
                  key={analysis.id}
                  className="nav-item"
                >
                  <button
                    className={`nav-link border mb-2 mt-2 ${analysis.flag ? 'text-danger' : ''}`}
                    onClick={() => handleAnalysisClick(analysis.id)}
                  >
                    {analysis.name}
                  </button>
                </li>
              ))
            ) : (
              <p>No analysis to display.</p>
            )}
          </ul>
        </div>
        <div className="col-8">
          {selectedAnalysis ? (
            <div>
              <h3>{selectedAnalysis.name}</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAnalysis.categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {report ? (
                <div>
                  <h3>{report.name}</h3>
                  {/* Split the lines by full stop and display in separate paragraphs */}
                  {report.report.split('.').map((line, index) => (
                    <p key={index}>{line.trim()}</p>
                  ))}
                </div>
              ) : (
                <button className="btn btn-primary" onClick={handleViewReport}>
                  View Report
                </button>
              )}
            </div>
          ) : (
            <p>Select an analysis from the list to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
