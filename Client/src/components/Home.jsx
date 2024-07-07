import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';
import video from '../video/video.mp4';
import { Box } from '@mui/material';

const Home = () => {
    const handleVideoClick = () => {
        const video = document.getElementById('videoElement');
        video.play();
    };

    useEffect(() => {
        const videoElement = document.getElementById('videoElement');
        if (videoElement) {
            videoElement.currentTime = 80; 
        }
    }, []);

    return (
        <>
            <Typography variant="h3" align="center">כולל צילו של היכל</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Box
                    component="video"
                    id="videoElement"
                    src={video}
                    controls
                    onClick={handleVideoClick}
                    sx={{
                        width: {
                            xs: '100%', 
                            sm: '80%',  
                            md: '60%', 
                            lg: '50%',  
                            xl: '800px' 
                        },
                        height: 'auto'
                    }}
                >
                    Your browser does not support the video tag.
                </Box>
            </Box>
        </>
    );
}

export default Home;
