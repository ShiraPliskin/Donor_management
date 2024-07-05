import React from "react";
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
// import video from '../video/video.mp4';

const Home = () => {
    // const handleVideoClick = () => {
    //     const video = document.getElementById('videoElement');
    //     video.play();
    // };

    // useEffect(() => {
    //     const videoElement = document.getElementById('videoElement');
    //     if (videoElement) {
    //         videoElement.currentTime = 80; 
    //     }
    // }, []);

    return (
        <>
            <Typography variant="h3" align="center">כולל צילו של היכל</Typography>
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <video
                    id="videoElement"
                    width="800"
                    height="450"
                    src={video}
                    controls
                    onClick={handleVideoClick}
                >
                    Your browser does not support the video tag.
                </video>
            </div> */}
        </>
    )
}

export default Home;