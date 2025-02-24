// homePage.js

import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar, searchTerm }) => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo')
      .then(res => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Updated options array: note the filter option "Web Developement" (with the typo) is kept as requested.
  const options = [
    "All",
    "Web Developement",
    "JavaScript",
    "React",
    "Information Technology",
    "Gaming",
    "Cricket",
    "News",
    "Live",
    "Recently updateds",
    "Mixes",
    "Dramas",
    "Comedy"
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter videos based on search term and selected category (case-insensitive).
  // For the "Web Developement" filter, if the videoType contains any of the words: 
  // "web", "development", "web development", or "web developement", it will match.
  const filteredData = data.filter((item) => {
    const title = String(item.title || "");
    const searchStr = String(searchTerm || "").toLowerCase();
    const matchesSearch = title.toLowerCase().includes(searchStr);

    const videoCategory = String(item.videoType || "").toLowerCase();
    let matchesCategory = false;

    if (selectedCategory === "All") {
      matchesCategory = true;
    } else if (selectedCategory === "Web Developement") {
      // List of words that should match the "Web Developement" filter.
      const validWords = ["web", "development", "web development", "web developement"];
      matchesCategory = validWords.some(word => videoCategory.includes(word));
    } else {
      matchesCategory = videoCategory.includes(selectedCategory.toLowerCase());
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div
            key={index}
            className={`homePage_option ${selectedCategory === item ? 'active' : ''}`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {filteredData.map((item) => (
          <Link to={`/watch/${item._id}`} className="youtube_video" key={item._id}>
            <div className="youtube_thumbnailBox">
              <img src={item.thumbnail} alt="Thumbnail" className="youtube_thumbnailPic" />
              <div className="youtube_timingThumbnail"></div>
            </div>
            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img src={item?.user?.profilePic} alt="profile" className="youtube_thumbnail_Profile" />
              </div>
              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item?.title}</div>
                <div className="youtube_channelName">{item?.user?.channelName}</div>
                <div className="youtubeVideo_views">{item?.views || 0}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
