import React, { useState } from 'react';
import Navbar from '../../Component/Navbar/navbar';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import HomePage from '../../Component/HomePage/homePage';
import './home.css';

const Home = () => {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='home'>
      <Navbar sideNavbar={sideNavbar} setSideNavbarFunc={setSideNavbar} onSearch={setSearchTerm} />
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
