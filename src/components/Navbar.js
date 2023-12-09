import React , { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import '../style/Navbar.css';


const Navbar = ({ logout, isAuthenticated, user }) => {

  const emailPattern = /^i\d{6}@nu\.edu\.pk$/;
  const isStudent = isAuthenticated && user && emailPattern.test(user.email);
  // const emailPattern = /^i\d{6}@nu\.edu\.pk$/; // Adjust the pattern as needed
  // return emailPattern.test(user.email);

  console.log(user)
  const guestLinks = () => (
    <Fragment>
      <Link className="nav-link active" aria-current="page" to="/">
      Home
      </Link>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/signup">
        Signup
      </Link>
    </Fragment>
  );

  const authLinks = () => (
    <>
     <Link className="nav-link active" aria-current="page" to="/auth">
      Home
      </Link>
      <Link className="nav-link" to="/" onClick={logout}>
        Logout
      </Link>
      <Link className="nav-link" to="/upload">
        Transcript
      </Link>
      <Link className="nav-link" to="/list">
        Transcription List
      </Link>
      <Link className="nav-link" to="/summary"> 
        Summary List
      </Link>
      {isStudent ? null : <Link className="nav-link" to="/analysis">Analysis</Link>}
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">


      <div className="container-fluid">
        <h1 className="navbar-brand">REVALYZE</h1>
        <button 
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            
            {isAuthenticated? authLinks() : guestLinks()} 
          </div>
        </div>
      </div>
      </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);