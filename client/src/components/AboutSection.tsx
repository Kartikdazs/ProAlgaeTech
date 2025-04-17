import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Bubble animation effect
  const createRandomBubble = () => {
    if (!bubbleContainerRef.current) return;
    
    const bubble = document.createElement('div');
    const size = Math.random() * 15 + 5; // 5-20px
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = '50%';
    bubble.style.position = 'absolute';
    bubble.style.bottom = '0';
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.backgroundColor = 'rgba(128, 222, 234, 0.3)';
    bubble.style.zIndex = '1';
    bubble.style.animation = `floatBubble ${Math.random() * 5 + 5}s linear forwards`;
    
    bubbleContainerRef.current.appendChild(bubble);
    
    // Remove the bubble after animation completes
    setTimeout(() => {
      bubble.remove();
    }, 10000);
  };
  
  // Create bubbles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      createRandomBubble();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-radial from-[#E0F7FA] via-white to-white z-0"></div>
      
      {/* Wave divider at the top */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180 h-20 bg-no-repeat bg-center bg-cover" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF' d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'%3E%3C/path%3E%3C/svg%3E")`
      }}></div>
      
      {/* Bubble container for animation */}
      <div 
        ref={bubbleContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Animation keyframes moved to index.css */}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-4">About Us</h2>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-[#38B09D] rounded-full"></div>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Circular "bubble" imagery */}
          <motion.div 
            className="lg:w-2/5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y }}
          >
            <div className="relative">
              {/* Main circular image */}
              <motion.div 
                className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#80DEEA] to-[#38B09D] mx-auto overflow-hidden relative shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 120,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Overlapping algae circles */}
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-full overflow-hidden border-2 border-white/20 shadow-inner"
                    style={{
                      width: `${Math.random() * 30 + 40}%`,
                      height: `${Math.random() * 30 + 40}%`,
                      top: `${Math.random() * 50}%`,
                      left: `${Math.random() * 50}%`,
                      zIndex: index + 1,
                    }}
                    animate={{ 
                      rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
                    }}
                    transition={{ 
                      duration: 90 + index * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-1557431518-672891a0c73e?q=80&w=600&auto=format&fit=crop&ixlib=${index}`}
                      alt={`Algae specimen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#006064] to-transparent opacity-30"></div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Decorative bubbles */}
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#80DEEA]/30 to-[#38B09D]/30 backdrop-blur-sm absolute -top-6 right-4 md:right-0 z-20 border border-white/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#80DEEA]/20 to-[#38B09D]/20 backdrop-blur-sm absolute -bottom-10 -left-10 md:-left-5 z-20 border border-white/20"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#80DEEA]/40 to-[#38B09D]/40 backdrop-blur-sm absolute top-1/3 -left-6 z-20 border border-white/30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg mb-8 text-[#263238] leading-relaxed">
              ProAlgaeTech is a pioneering biotechnology company dedicated to researching, developing, and implementing 
              algae-based solutions for a sustainable future. Our innovative approaches harness the power of these remarkable 
              organisms to address global challenges in energy, nutrition, and environmental conservation.
            </p>
            
            {/* Highlight Box */}
            <motion.div 
              className="bg-gradient-to-r from-[#E0F7FA] to-white border-l-4 border-[#38B09D] p-6 rounded-r-lg mb-8 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#006064] font-montserrat font-medium text-lg italic">
                "We are algae consultants specializing in cultivation, harvesting, and algae-based products."
              </p>
            </motion.div>
            
            <p className="text-lg mb-8 text-[#263238] leading-relaxed">
              With a team of passionate scientists and industry experts, we're at the forefront of algal biotechnology, 
              creating solutions that benefit both people and planet.
            </p>
            
            {/* Team Teaser */}
            <div className="flex items-center mb-8">
              {/* Team member photos */}
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, index) => (
                  <motion.div 
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + index}.jpg`}
                      alt={`Team member ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="ml-4 text-sm text-[#263238]/80">Our expert team of algae specialists</p>
            </div>
            
            {/* Read More Button */}
            <motion.button
              className="px-8 py-3 bg-[#38B09D] text-white font-montserrat font-medium rounded-lg hover:bg-[#006064] transition-colors duration-300 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 96, 100, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Read More</span>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-[#006064] to-[#006064] -z-0"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
