// Pages/CreateChannel/createChannel.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './createChannel.css';

const CreateChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [handle, setHandle] = useState('');
  const [description, setDescription] = useState('');
  const [channelBanner, setChannelBanner] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );

  // Retrieve userId from localStorage (ensure user is signed in)
  const userId = localStorage.getItem('userId');

  // Hook for navigation after successful creation
  const navigate = useNavigate();

  const handleCreateChannel = async () => {
    if (!channelName.trim() || !handle.trim()) {
      toast.error('Name and Handle cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/channel/createChannel', {
        userId,
        channelName,
        handle,
        avatar: uploadedImageUrl,
        description,
        channelBanner
      });
      toast.success('Channel created successfully');
      // Redirect to the user's channel page (or any desired route)
      navigate(`/user/${userId}`);
    } catch (err) {
      console.error(err);
      // If the backend returns a specific error message, display it
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Error creating channel');
      }
    }
  };

  return (
    <div className="create-channel-container">
      <h2>How you'll appear</h2>

      <div className="select-picture">
        <img className="channel-avatar" src={uploadedImageUrl} alt="Profile" />
        <button className="select-picture-btn">
          Select picture
        </button>
      </div>

      <div className="channel-fields">
        <label>Name</label>
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

        <label>Handle</label>
        <input
          type="text"
          placeholder="@yourHandle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Channel description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Channel Banner URL</label>
        <input
          type="text"
          placeholder="Channel banner image URL"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />
      </div>

      <div className="create-channel-footer">
        <button className="create-channel-btn" onClick={handleCreateChannel}>
          Create channel
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
