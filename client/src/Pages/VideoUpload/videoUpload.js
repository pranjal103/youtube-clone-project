import React, { useState, useEffect } from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {

    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "", // Changed from thumbnailUrl to thumbnail
        videoType: ""
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    }

    const uploadImage = async (e, type) => {
        setLoader(true);
        console.log("Uploading");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append('upload_preset', 'youtube-clone');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dldpmvy2l/${type}/upload`, data);
            const url = response.data.secure_url;
            setLoader(false);
            // For images, update "thumbnail"; for videos, use "videoLink"
            let val = type === "image" ? "thumbnail" : "videoLink";
            setInputField({
                ...inputField,
                [val]: url
            });
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    }

    const handleSubmitFunc = async () => {
        // Minimal change: Only require the video to be uploaded.
        if (!inputField.videoLink) {
            alert("Please upload the video before submitting.");
            return;
        }
        setLoader(true);
        await axios.post('http://localhost:4000/api/video', inputField, { withCredentials: true })
            .then((resp) => {
                console.log(resp);
                setLoader(false);
                alert("Video uploaded successfully!");
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
            });
    }

    console.log(inputField);

    useEffect(() => {
        let isLogin = localStorage.getItem("userId");
        if (isLogin === null) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='videoUpload'>
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                    <input
                        type="text"
                        value={inputField.title}
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        className="uploadFormInputs"
                        placeholder='Title of Video'
                    />
                    <input
                        type="text"
                        value={inputField.description}
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        className="uploadFormInputs"
                        placeholder='Description'
                    />
                    <input
                        type="text"
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        className="uploadFormInputs"
                        placeholder='Category'
                    />
                    <div>
                        Thumbnail{" "}
                        <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "image")} />
                    </div>
                    <div>
                        Video{" "}
                        <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, "video")} />
                    </div>
                    {loader && (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </div>

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default VideoUpload;
