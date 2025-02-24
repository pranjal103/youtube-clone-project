// Controllers/comment.js
const Comment = require('../Modals/comment');

exports.addComment = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : "607d1b2f5b3c3a2493d2f1";
    const { video, text } = req.body;
    const comment = new Comment({
      user: userId,
      video,
      text
    });
    await comment.save();
    res.status(201).json({ message: "Success", comment });
  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId })
      .populate('user','channelName profilePic userName createdAt about');
    res.status(201).json({ message: "Success", comments });
  } catch (error) {
    console.error("Error in getCommentByVideoId:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Updated: Rename update function to reflect "updateComment" via route name change
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    console.error("Error in updateComment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// New: Delete comment function
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
