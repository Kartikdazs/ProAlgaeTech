import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BubbleEffect from "./BubbleEffect";

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); 
  
  // Ripple animation function
  const createRippleEffect = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius = diameter / 2;
    
    const rect = card.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-circle");
    
    const ripple = card.getElementsByClassName("ripple-circle")[0];
    if (ripple) {
      ripple.remove();
    }
    
    card.appendChild(circle);
    
    // Remove the effect after animation completes
    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  return (
    <section 
      id="mission" 
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Parallax background layers */}
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDg2Yy0xMC42NyAwLTIwIDcuNjYtMjAgMTcuNThzOS4zMyAxNy41OSAyMCAxNy41OSAyMC03LjY3IDIwLTE3LjU5LTkuMzMtMTcuNTgtMjAtMTcuNTh6bTAtNjhjLTEwLjY3IDAtMjAgNy42Ni0yMCAxNy41OHM5LjMzIDE3LjU5IDIwIDE3LjU5IDIwLTcuNjcgMjAtMTcuNTktOS4zMy0xNy41OC0yMC0xNy41OHptMCAxMzZjLTEwLjY3IDAtMjAgNy42Ni0yMCAxNy41OHM5LjMzIDE3LjU5IDIwIDE3LjU5IDIwLTcuNjcgMjAtMTcuNTktOS4zMy0xNy41OC0yMC0xNy41OHoiIGZpbGw9IiMwMDYwNjQiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9zdmc+')]"
        style={{ y: bgY }}
      ></motion.div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#E0F7FA]/50 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
      ></motion.div>
      
      {/* Geometric shapes in middle layer */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-lg border border-[#80DEEA]/30 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              background: `linear-gradient(${Math.random() * 360}deg, rgba(128, 222, 234, 0.1), rgba(56, 176, 157, 0.1))`,
              transform: `rotate(${Math.random() * 45}deg)`,
              zIndex: 1
            }}
            animate={{
              rotate: [0, 360],
              y: [0, 10, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "linear",
              y: {
                duration: 10 + index,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              },
              x: {
                duration: 15 + index,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-4">Our Vision & Mission</h2>
          <div className="flex justify-center mb-4">
            <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5C20 -1.66667 40 -1.66667 60 5C80 11.6667 100 11.6667 120 5" stroke="#38B09D" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-lg max-w-3xl mx-auto text-[#263238]">
            We envision a world where the remarkable properties of algae are fully utilized to create 
            sustainable solutions for humanity's greatest challenges.
          </p>
        </motion.div>
        
        {/* Circular cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div 
            className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-[#80DEEA]/70 to-[#E0F7FA] rounded-full shadow-lg flex flex-col items-center justify-center text-center p-6 relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={createRippleEffect}
          >
            <div className="z-10 flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006064" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              
              <h3 className="text-xl font-montserrat font-bold text-[#006064] mb-2">Our Vision</h3>
              <p className="text-sm text-[#263238]">
                Creating a sustainable future by unlocking the full potential of algae for environmental, nutritional, and industrial applications.
              </p>
            </div>
            
            {/* Ripple effect styles are in index.css */}
          </motion.div>
          
          {/* Mission Card */}
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#38B09D]/80 to-[#80DEEA]/60 rounded-full shadow-lg flex flex-col items-center justify-center text-center p-8 relative overflow-hidden cursor-pointer z-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={createRippleEffect}
          >
            <div className="z-10 flex flex-col items-center">
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006064" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-montserrat font-bold text-white mb-3">Our Mission</h3>
              <p className="text-[#263238] leading-tight">
                To advance algae biotechnology through innovative research and development, creating sustainable 
                solutions that address global challenges in food security, energy production, and environmental protection.
              </p>
            </div>
          </motion.div>
          
          {/* Why ProAlgaeTech Card */}
          <motion.div 
            className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-[#006064]/90 to-[#38B09D]/70 rounded-full shadow-lg flex flex-col items-center justify-center text-center p-6 relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={createRippleEffect}
          >
            <div className="z-10 flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006064" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-9" />
                </svg>
              </div>
              
              <h3 className="text-xl font-montserrat font-bold text-white mb-2">Why ProAlgaeTech</h3>
              <p className="text-sm text-white/90">
                We combine cutting-edge science with practical applications, ensuring our innovations 
                are scalable, sustainable, and accessible to markets and communities worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <BubbleEffect />
    </section>
  );
};

export default MissionSection;
