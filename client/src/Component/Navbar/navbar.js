import React, { useState, useEffect } from 'react';
import './navbar.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';  // Adjust path if necessary
import axios from 'axios';

const Navbar = ({ setSideNavbarFunc, sideNavbar, onSearch }) => {
  const [userPic, setUserPic] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  

  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    if (setSideNavbarFunc) {
      setSideNavbarFunc(!sideNavbar);
    }
  };

  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const onclickOfPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === "Login") {
      setLogin(true);
    } else {
      // Logout
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    }
  };

  const getLogoutFun = async () => {
    axios
      .post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then(() => {
        console.log("Logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Check if user is logged in and set user pic
  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);

  // Debounce search input so onSearch is triggered after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, onSearch]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamburger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to="/" className="navbar_youtubeImg">
          <YouTubeIcon sx={{ fontSize: "34px" }} className="navbar_youtubeImage" />
          <div className="navbar_youtubeTitle">YouTube</div>
        </Link>
      </div>

      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className="navbar-right">
        {isLoggedIn && (
          <Link to={`/user/${localStorage.getItem("userId")}/upload`}>
            <VideoCallIcon
              sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
            />
          </Link>
        )}
        <NotificationsIcon
          sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
        />
        <img
          onClick={handleClickModal}
          src={userPic}
          className="navbar-right-logo"
          alt="Logo"
        />
        {navbarModal && (
          <div className="navbar-modal">
            {isLoggedIn && (
              <div className="navbar-modal-option" onClick={handleprofile}> Channel</div>
              
            )}
            {/* NEW: Replaced "Channels" with "Create Channel" */}
            {isLoggedIn && (
              <div
                className="navbar-modal-option"
                onClick={() => {
                  setNavbarModal(false);
                  navigate('/createChannel');
                }}
              >
                Create Channel
              </div>
            )}
            {isLoggedIn && (
              <div
                className="navbar-modal-option"
                onClick={() => onclickOfPopUpOption("Logout")}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="navbar-modal-option"
                onClick={() => onclickOfPopUpOption("Login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;
