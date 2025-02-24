// Pages/Video/video.js

import React, { useState, useEffect } from 'react'
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingMessage, setEditingMessage] = useState("");
    const [suggestionVideos, setSuggestionVideos] = useState([]); 
    const [menuOpen, setMenuOpen] = useState(null); // <--- ADD THIS

    // Get logged in user's id from localStorage
    const loggedInUser = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleMenuToggle = (commentId) => {
      // If you click on the same comment's menu, close it; otherwise, open that menu.
      setMenuOpen((prev) => (prev === commentId ? null : commentId));
    };

    const fetchVideoById = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
          console.log(response.data.video);
          setData(response.data.video);
          setVideoURL(response.data.video.videoLink);
          setComments(response.data.video.comments);
      } catch (err) {
          console.log(err);
      }
    };

    const getCommentByVideoId = async () => {
      try {
          console.log("Fetching comments for video id:", id);
          const res = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
          console.log("Comments fetched:", res.data.comments);
          // Sort comments so the most recent ones appear first
          const sortedComments = res.data.comments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setComments(sortedComments);
      } catch (err) {
          console.error("Error fetching comments:", err);
      }
    };

    // Fetch suggestion videos based on same videoType (category)
    const fetchSuggestionVideos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allVideo');
        // Filter videos with same videoType and exclude the current video
        const suggestions = res.data.videos.filter(
          v => v.videoType === data.videoType && v._id !== data._id
        );
        setSuggestionVideos(suggestions);
      } catch (err) {
        console.error("Error fetching suggestion videos:", err);
      }
    };

    // Function to update view count in the database
    const updateViews = async () => {
      try {
          const res = await axios.put(`http://localhost:4000/api/video/view/${id}`, {}, { withCredentials: true });
          setData(prev => ({ ...prev, views: res.data.updatedViews }));
      } catch (err) {
          console.error("Error updating views", err);
      }
    };

    // Add a comment
    const handleComment = async () => {
        const body = {
            text: message,
            video: id
        };
        try {
            await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true });
            setMessage("");
            getCommentByVideoId(); // Refresh comments
        } catch (err) {
            toast.error("Please Login First to comment");
        }
    };

    // Begin editing a comment
    const handleEdit = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditingMessage(currentText);
        // Close menu after clicking 'Edit'
        setMenuOpen(null);
    };

    // Save the updated comment
    const handleSave = async (commentId) => {
        try {
            await axios.put(`http://localhost:4000/commentApi/updateComment/${commentId}`, { text: editingMessage }, { withCredentials: true });
            setEditingCommentId(null);
            setEditingMessage("");
            getCommentByVideoId();
        } catch (err) {
            toast.error("Failed to update comment");
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditingMessage("");
    };

    // Delete a comment
    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:4000/commentApi/deleteComment/${commentId}`, { withCredentials: true });
            getCommentByVideoId();
        } catch (err) {
            toast.error("Failed to delete comment");
        }
        // Close menu after deleting
        setMenuOpen(null);
    };

    // Delete video functionality (only available to the video owner)
    const handleDeleteVideo = async () => {
      if (!window.confirm("Are you sure you want to delete this video?")) return;
      try {
        await axios.delete(`http://localhost:4000/api/video/${id}`, { withCredentials: true });
        toast.success("Video deleted successfully!");
        navigate("/");
      } catch (err) {
        toast.error("Failed to delete video");
      }
    };

    // Handle Like action
    const handleLike = async () => {
      try {
          const response = await axios.put(`http://localhost:4000/api/video/like/${id}`, {}, { withCredentials: true });
          setData(prev => ({ ...prev, like: response.data.updatedLikes }));
      } catch (err) {
          console.error("Error liking video:", err);
          toast.error("Please login first to like the video.");
      }
    };

    // Handle Dislike action
    const handleDislike = async () => {
      try {
          const response = await axios.put(`http://localhost:4000/api/video/dislike/${id}`, {}, { withCredentials: true });
          setData(prev => ({ ...prev, dislike: response.data.updatedDislikes }));
      } catch (err) {
          console.error("Error disliking video:", err);
          toast.error("Please login first to dislike the video.");
      }
    };

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [id]);

    // Update views when video id changes
    useEffect(() => {
        if (id) {
            updateViews();
        }
    }, [id]);

    // Fetch suggestion videos once video data is loaded
    useEffect(() => {
        if(data && data.videoType) {
            fetchSuggestionVideos();
        }
    }, [data]);

    return (
        <div className="Video">
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && (
                        <video width="400" controls autoPlay className='video_youtube_video'>
                            <source src={videoUrl} type="video/mp4" />
                            <source src={videoUrl} type="video/webm" />
                        </video>
                    )}
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle"><h3>{data?.title}</h3></div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img src={data?.user?.profilePic} alt="" className="youtube_video_ProfileBlock_left_image" />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like" onClick={handleLike}>
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like" onClick={handleDislike}>
                                <ThumbDownAltOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfDislikes">{data?.dislike}</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>Created on: {data?.createdAt.slice(0, 10)}</div>
                        <div>Video Description: {data?.description}</div>
                        <div>Views: {data?.views}</div>
                    </div>
                    {/* Delete Video button: only visible to the video owner */}
                    {loggedInUser === data?.user?._id && (
                      <button className="deleteVideoButton" onClick={handleDeleteVideo}>
                        Delete Video
                      </button>
                    )}
                    <div className="youtubeCommentSection">
                        <div className="youtubeCommentSectionTitle">Total Comments: {comments.length}</div>
                        <div className="youtubeSelfComment">
                            <img src={data?.user?.profilePic} className="video_youtubeSelfCommentProfile" />
                            <div className="addAComment">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="addAcommentInput"
                                    placeholder='Please Add a comment'
                                />
                                <div className="cancelSubmitComment">
                                    <div className="cancelComment">Cancel</div>
                                    <div className="cancelComment" onClick={handleComment}>Comment</div>
                                </div>
                            </div>
                        </div>
                        <div className="youtubeOthersComments">
                            {comments.map((item) => (
                                <div className="youtubeSelfComment" key={item._id}>
                                    <img
                                      src={item?.user.profilePic}
                                      className="video_youtubeSelfCommentProfile"
                                      alt="profile"
                                    />
                                    <div className="others_commentSection">
                                        {/* Minimal inline style for alignment */}
                                        <div
                                          className="others_commentSectionHeader"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                          }}
                                        >
                                            <div>
                                                <div className="channelName_comment">{item?.user?.channelName}</div>
                                                <div className="commentTimingOthers">{item?.user?.createdAt?.slice(0, 10)}</div>
                                            </div>
                                            {loggedInUser === item?.user?._id && (
                                                <div
                                                    className="commentMenuIcon"
                                                    onClick={() => handleMenuToggle(item._id)}
                                                >
                                                    ⋮
                                                </div>
                                            )}
                                        </div>

                                        {editingCommentId === item._id ? (
                                            <div className="otherCommentSectionComment">
                                                <input
                                                    type="text"
                                                    value={editingMessage}
                                                    onChange={(e) => setEditingMessage(e.target.value)}
                                                />
                                                <button onClick={() => handleSave(item._id)}>Save</button>
                                                <button onClick={handleCancelEdit}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="otherCommentSectionComment">
                                                {item?.text}
                                            </div>
                                        )}

                                        {menuOpen === item._id && (
                                            <div className="commentMenuDropdown">
                                                <button onClick={() => handleEdit(item._id, item.text)}>Edit</button>
                                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="videoSuggestions">
                {suggestionVideos.map(video => (
                    <Link
                      to={`/watch/${video._id}`}
                      key={video._id}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="videoSuggestionsBlock">
                            <div className="video_suggetion_thumbnail">
                                <img
                                  src={video.thumbnail}
                                  alt="suggestion"
                                  className="video_suggetion_thumbnail_img"
                                />
                            </div>
                            <div className="video_suggetions_About">
                                <div className="video_suggetions_About_title">{video.title}</div>
                                <div className="video_suggetions_About_Profile">{video.user?.channelName}</div>
                                <div className="video_suggetions_About_Profile">{video.views} views</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <ToastContainer />
        </div>
    )
}

export default Video;
