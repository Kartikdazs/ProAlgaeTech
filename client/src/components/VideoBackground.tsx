import { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  fallbackImageURL: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ fallbackImageURL }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Video URLs - simulated here with a placeholder until actual videos are provided
  // For a real implementation, you'd want to add actual video files to your project
  const videoSrc = "https://mazwai.com/videvo_files/video/free/2015-09/small_watermarked/Ocean_Waves_slow_motion_preview.mp4";

  // Pause video when not in view for performance optimization
  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleVisibilityChange, options);
    
    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Play/pause video based on visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isVisible) {
      videoRef.current.play().catch(error => {
        console.warn('Auto-play was prevented:', error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Add a CSS filter class for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#006064]/80 to-[#38B09D]/80 mix-blend-multiply z-10"></div>
      
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImageURL}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Fallback image for browsers that don't support video */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${fallbackImageURL})`,
          opacity: 0.5
        }}
      ></div>
    </div>
  );
};

export default VideoBackground;