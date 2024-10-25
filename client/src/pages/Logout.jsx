import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null); // Clear the user state
    navigate('/login');   // Redirect to the login page
  }, [setCurrentUser, navigate]); // Run this effect once on mount

  return null; // No need to render anything
};

export default Logout;