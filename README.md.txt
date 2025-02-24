# YouTube Clone Using the MERN Stack

## Overview
This project is a full-stack YouTube clone built with the MERN (MongoDB, Express, React, Node.js) stack. It replicates core YouTube functionalities, including video display, user authentication, video playback, channel management, search, and filtering. The project demonstrates modern web development practices, secure API design, and responsive UI/UX.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture & Technology Stack](#architecture--technology-stack)
- [Installation & Setup](#installation--setup)
- [Detailed Feature Implementation](#detailed-feature-implementation)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Demo Video](#demo-video)
- [Conclusion](#conclusion)
- [References](#references)

## Features
- **Home Page UI/UX:**  
  - YouTube-like header with a hamburger menu for a toggleable sidebar.
  - Video grid displaying thumbnails along with title, channel name, and view count.
  - Filter buttons and a search bar to filter videos by title and category.

- **User Authentication:**  
  - Registration and login forms.
  - JWT-based authentication; upon signing in, the user’s name is displayed on the header.

- **Video Player Page:**  
  - Video playback with an integrated video player.
  - Display of video details (title, description, channel name).
  - Interactive like/dislike buttons.
  - Comments section supporting add, edit, and delete operations.

- **Channel Page:**  
  - Channel creation available only to signed-in users.
  - Listing of videos associated with a channel.
  - Options for editing and deleting videos.

- **Responsive Design:**  
  - Optimized layouts for mobile, tablet, and desktop devices.

## Architecture & Technology Stack
- **Front-End:** React, React Router, Axios  
- **Back-End:** Node.js, Express.js  
- **Database:** MongoDB (Atlas or local instance)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Version Control:** Git  

## Installation & Setup

### Prerequisites
- Node.js (v12 or later)
- npm or yarn
- MongoDB (Atlas account or a local MongoDB instance)

### Installation Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/pranjal103/youtubClone.git
   cd youtubClone
