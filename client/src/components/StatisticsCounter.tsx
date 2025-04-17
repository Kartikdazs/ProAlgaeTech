import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatisticProps {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const Statistic = ({ label, value, suffix = "+", duration = 2.5, delay = 0 }: StatisticProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  
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
      className="text-center" 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      ref={elementRef}
    >
      <h3 className="text-4xl font-bold text-[#006064] flex items-center justify-center">
        <span>{count}</span>
        <span className="text-[#38B09D]">{suffix}</span>
      </h3>
      <p className="mt-2 text-[#263238] font-medium">{label}</p>
    </motion.div>
  );
};

const StatisticsCounter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
      <Statistic label="Years Experience" value={15} delay={0.2} />
      <Statistic label="Successful Projects" value={250} delay={0.4} />
      <Statistic label="Algae Strains" value={100} delay={0.6} />
    </div>
  );
};

export default StatisticsCounter;