import React, { useState, useEffect } from 'react';

const VideoBackground = ({ children }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Check if video file exists
    fetch('/ai-background.mp4', { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          setVideoError(true);
        }
      })
      .catch(() => {
        setVideoError(true);
      });
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="video-background-container">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-background-video"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            style={{ 
              display: 'block', 
              opacity: '0.4', 
              zIndex: '1',
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          >
            <source src="/ai-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="animated-gradient-background"></div>
        )}
        
        {/* Overlay for better text readability */}
        <div className="video-background-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="video-background-content">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground; 