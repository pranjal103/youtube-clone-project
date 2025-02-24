// Controllers/video.js
const Video = require('../Modals/video');

exports.uploadVideo = async (req, res) => {
    try {
      const { title, description, videoLink, videoType, thumbnail } = req.body;
      const userId = req.user ? req.user._id : "607d1b2f5b3c3a2493d2f1";
      const videoUpload = new Video({
        user: userId,
        title,
        description,
        videoLink,
        videoType,
        thumbnail
      });
      await videoUpload.save();
      res.status(201).json({ success: "true", videoUpload });
    } catch (error) {
      console.error("Error in uploadVideo:", error);
      res.status(500).json({ error: error.message });
    }
};
  
exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate('user','channelName profilePic userName createdAt');
    res.status(201).json({ success: "true", videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt');
    res.status(201).json({ success: "true", video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    const video = await Video.find({ user: userId }).populate('user','channelName profilePic userName createdAt about');
    res.status(201).json({ success: "true", video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// New: Like video function
exports.likeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ error: "Video not found" });
        video.like += 1;
        await video.save();
        res.status(200).json({ updatedLikes: video.like });
    } catch (error) {
        console.error("Error in likeVideo:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// New: Dislike video function
exports.dislikeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ error: "Video not found" });
        video.dislike += 1;
        await video.save();
        res.status(200).json({ updatedDislikes: video.dislike });
    } catch (error) {
        console.error("Error in dislikeVideo:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    video.views += 1;
    await video.save();
    res.status(200).json({ updatedViews: video.views });
  } catch (error) {
    console.error("Error updating views:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the video by its ID
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    // Check if the logged-in user is the owner of the video
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own video" });
    }
    // Delete the video from the database
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Server error" });
  }
};
