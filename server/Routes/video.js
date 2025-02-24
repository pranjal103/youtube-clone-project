// Routes/video.js
const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video');
const auth = require('../middleware/authentication');

router.post('/video', auth, videoController.uploadVideo);
router.get('/allVideo', videoController.getAllVideo);
router.get('/getVideoById/:id', videoController.getVideoById);
router.get('/:userId/channel', videoController.getAllVideoByUserID);

// New routes for like and dislike
router.put('/video/like/:id', auth, videoController.likeVideo);
router.put('/video/dislike/:id', auth, videoController.dislikeVideo);
router.put('/video/view/:id', auth, videoController.updateViews);

// New route for deleting a video
router.delete('/video/:id', auth, videoController.deleteVideo);

module.exports = router;
