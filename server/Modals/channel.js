const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Ensure this matches your actual User model name
    required: true
  },
  channelName: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  channelBanner: {
    type: String,
    default: "https://via.placeholder.com/600x200"
  },
  avatar: {
    type: String,
    required: true
  },
  subscribers: {
    type: Number,
    default: 0
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video'
  }]
}, { timestamps: true });

module.exports = mongoose.model('channel', channelSchema);
