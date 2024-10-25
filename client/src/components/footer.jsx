import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
  return (
   <footer>

<div className="footer__categories-container">
        <Link to="/posts/categories/Agriculture" className="footer__category">Agriculture</Link>
        <Link to="/posts/categories/Business" className="footer__category">Business</Link>
        <Link to="/posts/categories/Education" className="footer__category">Education</Link>
        <Link to="/posts/categories/Entertainment" className="footer__category">Entertainment</Link>
        <Link to="/posts/categories/Art" className="footer__category">Art</Link>
        <Link to="/posts/categories/Investment" className="footer__category">Investment</Link>
        <Link to="/posts/categories/Uncategorised" className="footer__category">Uncategorised</Link>
        <Link to="/posts/categories/Weather" className="footer__category">Weather</Link>
      </div>


    <div className="footer__copyright">
      <small>
        All Rights Reserved &copy; Copyright, Abhijaya Aswinee B
      </small>
    </div>
   </footer>

  
  )
}

export default footer