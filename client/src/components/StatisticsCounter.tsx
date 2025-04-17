import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface StatisticProps {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  icon?: React.ReactNode;
}

const Statistic = ({ 
  label, 
  value, 
  suffix = "+", 
  duration = 2.5, 
  delay = 0, 
  icon 
}: StatisticProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Start counter animation after delay
      const startTime = Date.now() + delay * 1000;
      const timer = setInterval(() => {
        const now = Date.now();
        if (now < startTime) return;
        
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / (duration * 1000), 1);
        const easedProgress = easeOutExpo(progress);
        
        const currentCount = Math.floor(easedProgress * value);
        setCount(currentCount);
        
        if (progress >= 1) {
          clearInterval(timer);
          // Show pulse effect when counter finishes
          setShowPulse(true);
        }
      }, 16); // ~60fps
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, delay, hasAnimated]);
  
  // Easing function for smoother animation
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
  return (
    <motion.div 
      className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#80DEEA]/30 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      ref={elementRef}
      whileHover={{ y: -5 }}
    >
      {/* Background circle decoration */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#E0F7FA] opacity-20 group-hover:bg-[#80DEEA] group-hover:opacity-30 transition-colors duration-300"></div>
      
      {/* Icon above the counter */}
      {icon && (
        <motion.div 
          className="mb-3 text-[#38B09D] flex justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {icon}
        </motion.div>
      )}
      
      {/* Counter with animated pulse effect */}
      <div className="relative">
        <h3 className="text-4xl md:text-5xl font-bold text-[#006064] flex items-center justify-center">
          <span>{count}</span>
          <span className="text-[#38B09D]">{suffix}</span>
        </h3>
        
        <AnimatePresence>
          {showPulse && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#38B09D]"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: 2,
                repeatType: "loop"
              }}
            />
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-3 text-[#263238] font-medium relative z-10">{label}</p>
      
      {/* Bottom decoration */}
      <motion.div 
        className="w-16 h-1 bg-[#38B09D] rounded-full mx-auto mt-3 relative z-10"
        initial={{ width: 0 }}
        animate={{ width: "4rem" }}
        transition={{ duration: 0.6, delay: delay + 1 }}
      />
    </motion.div>
  );
};

const StatisticsCounter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 mb-8 px-4">
      <Statistic 
        label="Years Experience" 
        value={15} 
        delay={0.2} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        }
      />
      <Statistic 
        label="Successful Projects" 
        value={250} 
        delay={0.4} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
      />
      <Statistic 
        label="Algae Strains" 
        value={100} 
        delay={0.6} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        }
      />
    </div>
  );
};

export default StatisticsCounter;