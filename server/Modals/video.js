// Modals/video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    default: "All"
  },
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  channelId: {
    type: String,
  },
  uploader: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }]
}, { timestamps: true });

videoSchema.virtual("videoId").get(function () {
  return this._id.toHexString();
});

videoSchema.virtual("thumbnailUrl").get(function () {
  return this.thumbnail;
});

videoSchema.virtual("likes").get(function () {
  return this.like;
});

videoSchema.virtual("dislikes").get(function () {
  return this.dislike;
});

videoSchema.virtual("uploadDate").get(function () {
  return this.createdAt ? this.createdAt.toISOString().split('T')[0] : null;
});

videoSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('video', videoSchema);
