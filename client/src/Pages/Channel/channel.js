import React, { useState, useEffect } from 'react'
import './channel.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        axios.get("http://localhost:4000/api/67b87037d7c70c87cdd6d733/channel").then((response)=>{
            console.log(response);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        }).catch(err=>{
                console.log(err);
         })
        
    }
    useEffect(() => {
        fetchProfileData()
    }, [])

    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>

                <div className="profile_top_section">

                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={user?.profilePic} alt="" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">{user?.channelName}</div>
                        <div className="profile_top_section_info">
                            {user?.userName} . {data.length} Videos
                        </div>
                        <div className="profile_top_section_info">
                            {user?.about}
                        </div>
                    </div>
                    
                </div>

                <div className="profile_videos">
                    <div className="profile_videos_title">
                        <div className="video_section">Videos &nbsp; <ArrowRightIcon /> </div>
                        <div className="upload_channel_video"> 
                            <Link to={`/user/${localStorage.getItem("userId")}/upload`} className="uploadBtn-form">Upload Video</Link>
                            
                        </div>
                    </div>
                    

                    <div className="profileVideos">
                    {
                    data.map((item) => {
                        return (
                        <Link key={item._id} to={`/watch/${item._id}`} className="profileVideo_block">
                            <div className="profileVideo_block_thumbnail">
                            <img src={item?.thumbnail} alt="" className="profileVideo_block_thumbnail_img" />
                            </div>
                            <div className="profileVideo_block_detail">
                            <div className="profileVideo_block_detail_name">{item?.title}</div>
                            <div className="profileVideo_block_detail_about">Created on {item?.createdAt.slice(0,10)}</div>
                            </div>
                        </Link>
                        )
                    })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile