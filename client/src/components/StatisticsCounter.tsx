import { useState, useEffect, useRef } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Set up intersection observer to detect when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px 0px" }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  
  // Handle counter animation
  useEffect(() => {
    if (isVisible && !hasAnimated) {
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
  }, [isVisible, value, duration, delay, hasAnimated]);
  
  // Easing function for smoother animation
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
  return (
    <div 
      ref={elementRef}
      className={`text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#80DEEA]/30 relative overflow-hidden group transform hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      style={{ 
        transitionDelay: `${delay}s`,
        transitionProperty: "opacity, transform",
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* Background circle decoration */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#E0F7FA] opacity-20 group-hover:bg-[#80DEEA] group-hover:opacity-30 transition-colors duration-300"></div>
      
      {/* Icon above the counter */}
      {icon && (
        <div 
          className={`mb-3 text-[#38B09D] flex justify-center transition-transform duration-500 ease-out ${isVisible ? "scale-100" : "scale-75"}`}
          style={{ transitionDelay: `${delay + 0.3}s` }}
        >
          {icon}
        </div>
      )}
      
      {/* Counter with animated pulse effect */}
      <div className="relative">
        <h3 className="text-4xl md:text-5xl font-bold text-[#006064] flex items-center justify-center">
          <span>{count}</span>
          <span className="text-[#38B09D]">{suffix}</span>
        </h3>
        
        {showPulse && (
          <div className="absolute inset-0 rounded-full bg-[#38B09D] animate-statistic-pulse"></div>
        )}
      </div>
      
      <p className="mt-3 text-[#263238] font-medium relative z-10">{label}</p>
      
      {/* Bottom decoration */}
      <div 
        className={`h-1 bg-[#38B09D] rounded-full mx-auto mt-3 relative z-10 transition-all duration-600 ease-out ${isVisible ? "w-16" : "w-0"}`}
        style={{ transitionDelay: `${delay + 1}s` }}
      />
    </div>
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