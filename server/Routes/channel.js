// Routes/channel.js
const express = require('express');
const router = express.Router();
const ChannelController = require('../Controllers/channel');
const auth = require('../middleware/authentication');

// Route to create a channel (only accessible if signed in)
router.post('/createChannel', auth, ChannelController.createChannel);

module.exports = router;
