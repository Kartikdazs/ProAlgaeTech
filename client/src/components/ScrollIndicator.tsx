import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  targetId: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId }) => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={scrollToTarget}
    >
      <motion.div 
        className="p-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-[#006064] text-sm font-medium mb-2">Scroll Down</span>
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 30 30" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 2 L15 28 M15 28 L7 20 M15 28 L23 20" 
              stroke="#006064" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-20 h-20"
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <svg 
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 Z" 
            stroke="#80DEEA"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{
              animation: "dash 3s ease-in-out infinite"
            }}
          />
        </svg>
      </motion.div>
      
      <style>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 300;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -300;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ScrollIndicator;