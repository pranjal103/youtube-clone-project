// Routes/comment.js
const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/comment');
const auth = require('../middleware/authentication');

router.post('/comment', auth, CommentController.addComment);
router.get('/comment/:videoId', CommentController.getCommentByVideoId);
// Updated route for updating a comment
router.put('/updateComment/:commentId', auth, CommentController.updateComment);
// New route for deleting a comment
router.delete('/deleteComment/:commentId', auth, CommentController.deleteComment);

module.exports = router;
