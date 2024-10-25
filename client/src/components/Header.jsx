import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '../images/Logo.png'
import { UserContext } from '../context/userContext';
import {Link}  from 'react-router-dom';
import React, {useState, useEffect, useContext} from  'react';



const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  // Effect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavHandler = () => {
    setIsNavShowing((prevState) => !prevState);
  };

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" />
        </Link>

        
        {currentUser?.id && isNavShowing && <ul className={`nav__menu`}> 
          <li>
            <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
              {currentUser?.name}
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>
              Create Post
            </Link>
          </li>
          <li>
            <Link to="/authors" onClick={closeNavHandler}>
              Authors
            </Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>}
        {!currentUser?.id && isNavShowing && <ul className={`nav__menu`}> 
          <li>
            <Link to="/authors" onClick={closeNavHandler}>
              Authors
            </Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>}
       
        <button className="nav__toggle-btn" onClick={toggleNavHandler}>
        {isNavShowing ? <AiOutlineClose /> : <FaBars />}
      </button> 
      </div>
    </nav>
  );
};

export default Header;
