import { motion } from "framer-motion";
import { useState } from "react";

interface ScrollIndicatorProps {
  targetId: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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

  return (
    <motion.div 
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={scrollToTarget}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      {/* Pulsing circles behind the scroll indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-16 w-16 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#80DEEA]/20 animate-ping-slow"></div>
        <div className="h-12 w-12 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#80DEEA]/30 animate-ping-medium"></div>
      </div>
      
      <motion.div 
        className="p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg border border-[#80DEEA]/30"
        animate={{ 
          y: [0, 10, 0],
          boxShadow: isHovered 
            ? "0 10px 25px -5px rgba(0, 96, 100, 0.3)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ 
          y: {
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          },
          boxShadow: {
            duration: 0.3
          }
        }}
      >
        <div className="flex flex-col items-center">
          <motion.span 
            className="text-[#006064] font-montserrat font-semibold text-md mb-2"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              color: isHovered ? "#38B09D" : "#006064"
            }}
            transition={{ duration: 0.3 }}
          >
            Scroll Down
          </motion.span>
          
          <motion.div
            animate={{ 
              y: [0, 5, 0],
              rotateZ: isHovered ? [0, -10, 10, 0] : 0
            }}
            transition={{ 
              y: { 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut",
                repeatType: "mirror"
              },
              rotateZ: {
                repeat: isHovered ? 1 : 0,
                duration: 0.5
              }
            }}
          >
            <svg 
              width="34" 
              height="34" 
              viewBox="0 0 30 30" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow"
            >
              <path 
                d="M15 2 L15 28 M15 28 L7 20 M15 28 L23 20" 
                stroke={isHovered ? "#38B09D" : "#006064"} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated circle outline */}
      <motion.div 
        className="absolute -inset-3 -z-10"
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.9, 1, 0.9],
          rotate: [0, 360]
        }}
        transition={{ 
          opacity: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          },
          scale: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          },
          rotate: {
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }
        }}
      >
        <svg 
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;