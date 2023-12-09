import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
    // Add any new fields introduced in your Django user model
    // For example, if you added a 'status' field:
    status: '',
  });

  const { name, email, password, re_password, status } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      // Pass the 'status' field to the signup action
      signup(name, email, password, re_password, status);
      setAccountCreated(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (accountCreated) {
      navigate('/login');
    }
  }, [accountCreated, navigate]);

  return (
    <div className='container mt-5'>
      <h1>Sign Up</h1>
      <p>Create Your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>

      <div className='form-group'>
          <input
          className='form-control mt-3'
          type='text'
          placeholder='Name *'
          name='name'
          value={name}
          onChange={e => onChange(e)}
          required
          />
        </div>


        <div className='form-group'>
          <input
          className='form-control mt-3'
          type='email'
          placeholder='Email *'
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required
          />
        </div>


        <div className='form-group'>
          <input
          className='form-control mt-3'
          type='password'
          placeholder='Password *'
          name='password'
          value={password}
          onChange={e => onChange(e)}
          minLength={8}
          required
          />
        </div>


        <div className='form-group'>
          <input
          className='form-control mt-3'
          type='password'
          placeholder='Confirm Password *'
          name='re_password'
          value={re_password}
          onChange={e => onChange(e)}
          minLength={8}
          required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control mt-3'
            type='text'
            placeholder='Status *'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button className='btn btn-primary mt-3' type='submit'>
          Register
        </button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link to='/login'>Sign IN</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);