import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Revalyze</h1>
        <p className="lead">Transcription, summarization, and analysis of speeches and meetings.</p>
        <hr className="my-4" />
        <p>Click the button to Log In</p>
        <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>
      </div>
    </div>
  );
};

export default Home;
