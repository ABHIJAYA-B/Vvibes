import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import {UserContext} from '../context/userContext.js'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [error,  setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)


  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      // Use optional chaining to safely access error response
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In!</h2>
        <form className="form login__form" onSubmit = {loginUser}>
          {error && <p className="form__error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler} autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />

          <button type="submit" className="btn primary">Login</button>
        </form>
        <small className="option">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
