import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [authorID]);

  // Ensure createdAt is valid
  const date = createdAt ? new Date(createdAt) : new Date();

  return (
    <Link to={`/posts/users/${authorID}`} className="post__author"> 
      <div className="post__author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="Author Avatar" />
      </div>
      <div className="post__author-details">
        <h5>By: {author?.name || 'Unknown Author'}</h5>
        <small><ReactTimeAgo date={date} locale="en-US" /></small>
      </div>
    </Link>
  );
};

export default PostAuthor;
