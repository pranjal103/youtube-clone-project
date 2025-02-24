// App.js

import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Channel from './Pages/Channel/channel';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import CreateChannel from './Pages/CreateChannel/createChannel';  // <-- NEW IMPORT
import axios from 'axios';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className="App">
      <Navbar
        setSideNavbarFunc={setSideNavbarFunc}
        sideNavbar={sideNavbar}
        onSearch={setSearchTerm}
      />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Channel sideNavbar={sideNavbar} />} />
        <Route path='/user/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
        
        {/* NEW: Route for creating a channel */}
        <Route path='/createChannel' element={<CreateChannel />} />
      </Routes>
    </div>
  );
}

export default App;
