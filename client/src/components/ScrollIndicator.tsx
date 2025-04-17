import { useState, useEffect } from "react";

interface ScrollIndicatorProps {
  targetId: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bounceOffset, setBounceOffset] = useState(0);
  const [rotation, setRotation] = useState(0);
  
  // Scroll function
  const scrollToTarget = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  
  // Show component with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle bounce animation
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds per cycle
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Simple sine wave for smooth bounce
      const bounce = Math.sin(progress * Math.PI * 2) * 10;
      setBounceOffset(bounce);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  // Handle rotation animation when hovered
  useEffect(() => {
    if (isHovered) {
      let startTime = Date.now();
      let animationFrame: number;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < 500) { // 500ms duration
          // Wobble animation: -10 to 10 degrees and back
          const progress = elapsed / 500;
          const wobble = progress < 0.5 
            ? -10 + progress * 40 
            : 10 - (progress - 0.5) * 40;
            
          setRotation(wobble);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setRotation(0);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
        setRotation(0);
      };
    }
  }, [isHovered]);
  
  // SVG circle rotation
  useEffect(() => {
    const svg = document.getElementById('scroll-circle-svg');
    if (!svg) return;
    
    let rotation = 0;
    let animationFrame: number;
    
    const animate = () => {
      rotation = (rotation + 0.2) % 360;
      if (svg) {
        svg.style.transform = `rotate(${rotation}deg)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      onClick={scrollToTarget}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate(-50%, ${isVisible ? 0 : '20px'}) scale(${isHovered ? 1.1 : 1})`,
        transition: 'transform 0.3s ease, opacity 0.5s ease'
      }}
    >
      {/* Pulsing circles behind the scroll indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-16 w-16 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#80DEEA]/20 animate-ping-slow"></div>
        <div className="h-12 w-12 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#80DEEA]/30 animate-ping-medium"></div>
      </div>
      
      <div 
        className="p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg border border-[#80DEEA]/30 transition-shadow duration-300"
        style={{ 
          transform: `translateY(${bounceOffset}px)`,
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgba(0, 96, 100, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex flex-col items-center">
          <span 
            className={`text-center font-semibold text-md mb-2 transition-all duration-300 ${isHovered ? 'text-[#38B09D] scale-110' : 'text-[#006064] scale-100'}`}
          >
            Scroll Down
          </span>
          
          <div
            style={{ 
              transform: `translateY(${bounceOffset/2}px) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            <svg 
              width="34" 
              height="34" 
              viewBox="0 0 30 30" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow transition-colors duration-300"
            >
              <path 
                d="M15 2 L15 28 M15 28 L7 20 M15 28 L23 20" 
                stroke={isHovered ? "#38B09D" : "#006064"} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Animated circle outline */}
      <div className="absolute -inset-3 -z-10 opacity-70">
        <svg 
          id="scroll-circle-svg"
          viewBox="0 0 100 100"
          className="w-full h-full animate-pulse-opacity"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transition: 'transform 0.1s linear' }}
        >
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#80DEEA" />
              <stop offset="100%" stopColor="#38B09D" />
            </linearGradient>
          </defs>
          <path 
            d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z" 
            stroke="url(#scrollGradient)"
            strokeWidth="3"
            strokeDasharray="300"
            strokeDashoffset="300"
            className="dash-animation"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollIndicator;