// Modals/comments.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video', 
    required: true
  },
  text: { 
    type: String, 
    required: true
  }
}, { timestamps: true });

commentSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

commentSchema.virtual("userId").get(function () {
  return this.populated('user') ? this.user._id.toHexString() : this.user.toHexString();
});

commentSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('comment', commentSchema);
