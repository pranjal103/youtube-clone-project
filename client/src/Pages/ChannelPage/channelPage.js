import React, { useState, useEffect } from 'react';
import './channelPage.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ChannelPage = ({ sideNavbar }) => {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
                console.log(response);
                setVideos(response.data.videos);
                setChannel(response.data.channel);
            } catch (error) {
                console.error("Error fetching channel data:", error);
            }
        };

        fetchChannelData();
    }, [id]);

    return (
        <div className="channel">
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "channel_page" : "channel_page_inactive"}>
                
                {channel && (
                    <>
                        {/* Channel Banner */}
                        <div 
                            className="channel_banner" 
                            style={{ backgroundImage: `url(${channel.channelBanner})` }} 
                        />

                        {/* Channel Info Section */}
                        <div className="channel_info_section">
                            <img className="channel_profile_img" src={channel.ownerAvatar} alt="Channel Avatar" />
                            
                            <div className="channel_details">
                                <div className="channel_name">{channel.channelName}</div>
                                <div className="channel_meta">
                                    {channel.owner} · {videos.length} Videos · {channel.subscribers} Subscribers
                                </div>
                                <div className="channel_description">{channel.description}</div>
                            </div>
                        </div>

                        {/* Videos Section */}
                        <div className="channel_videos">
                            <div className="channel_videos_title">Videos &nbsp; <ArrowRightIcon /></div>

                            <div className="channelVideos">
                                {videos.map((video) => (
                                    <Link to={`/watch/${video._id}`} className="channelVideo_block" key={video._id}>
                                        <div className="channelVideo_block_thumbnail">
                                            <img src={video.thumbnail} alt="" className="channelVideo_block_thumbnail_img" />
                                        </div>
                                        <div className="channelVideo_block_detail">
                                            <div className="channelVideo_block_detail_name">{video.title}</div>
                                            <div className="channelVideo_block_detail_about">Uploaded on {video.uploadDate.slice(0,10)}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChannelPage;
