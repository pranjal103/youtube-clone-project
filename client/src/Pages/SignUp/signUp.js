import React, { useState } from 'react';
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
    email: ""
  });
  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');
    try {
      setProgressBar(true);
      const response = await axios.post("https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload", data);
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl
      });
    } catch (err) {
      console.log(err);
      setProgressBar(false);
    }
  };

  const handleSignup = async () => {
    setProgressBar(true);
    // Construct payload; backend will handle bcrypt hashing and user creation.
    const payload = { ...signUpField, avatar: signUpField.profilePic };
    axios.post("http://localhost:4000/auth/signUp", payload)
      .then((res) => {
        toast.success(res.data.message);
        setProgressBar(false);
        navigate('/');
      })
      .catch(err => {
        setProgressBar(false);
        toast.error(err.response?.data?.error || "SignUp failed");
      });
  };

  return (
    <div className='signUp'>
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
          SignUp
        </div>
        <div className="signUp_Inputs">
          <input 
            type="text" 
            className="signUp_Inputs_inp" 
            value={signUpField.channelName} 
            onChange={(e) => handleInputField(e, "channelName")} 
            placeholder='Channel Name' 
          />
          <input 
            type="text" 
            className="signUp_Inputs_inp" 
            value={signUpField.userName} 
            onChange={(e) => handleInputField(e, "userName")} 
            placeholder='User Name' 
          />
          <input 
            type="email" 
            className="signUp_Inputs_inp" 
            value={signUpField.email} 
            onChange={(e) => handleInputField(e, "email")} 
            placeholder='Email' 
          />
          <input 
            type="password" 
            className="signUp_Inputs_inp" 
            value={signUpField.password} 
            onChange={(e) => handleInputField(e, "password")}  
            placeholder='Password' 
          />
          <input 
            type="text" 
            className="signUp_Inputs_inp" 
            value={signUpField.about} 
            onChange={(e) => handleInputField(e, "about")}  
            placeholder='About your channel' 
          />
          <div className="image_upload_signup">
            <input type='file' onChange={uploadImage} />
            <div className='image_upload_signup_div'>
              <img className='image_default_signUp' src={uploadedImageUrl} alt="Profile" />
            </div>
          </div>
          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
            <Link to='/' className="signUpBtn">Home Page</Link>
          </div>
          {progressBar && 
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
