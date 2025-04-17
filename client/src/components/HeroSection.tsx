import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleEffect from "./ParticleEffect";
import BubbleEffect from "./BubbleEffect";
import WaveDivider from "./WaveDivider";
import FloatingAlgaeCells from "./FloatingAlgaeCells";
import StatisticsCounter from "./StatisticsCounter";
import ScrollIndicator from "./ScrollIndicator";
import VideoBackground from "./VideoBackground";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offsetTop = aboutSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };
  
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const offsetTop = servicesSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen overflow-hidden"
      ref={sectionRef}
    >
      {/* Layered background with video */}
      <VideoBackground fallbackImageURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='500' viewBox='0 0 1000 500'%3E%3Crect width='1000' height='500' fill='%23006064'/%3E%3Cpath d='M0,100 Q250,180 500,100 T1000,100 V500 H0 Z' fill='%2338B09D' opacity='0.3'/%3E%3Cpath d='M0,150 Q250,250 500,150 T1000,150 V500 H0 Z' fill='%2380DEEA' opacity='0.2'/%3E%3C/svg%3E" />
      
      {/* Particle and bubble effects */}
      <ParticleEffect />
      <BubbleEffect />
      
      {/* Floating algae cells with interactive effects */}
      <FloatingAlgaeCells />
      
      {/* Main content with parallax effect */}
      <motion.div 
        className="container mx-auto px-4 relative pt-28 md:pt-40 z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          className="max-w-4xl mx-auto"
        >
          <div className="text-center">
            <motion.h1 
              className="font-montserrat font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Algae are the diverse and potential organisms for the future economy
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white text-opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Harnessing nature's green potential for sustainable solutions
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={scrollToServices}
                className="px-8 py-3 bg-[#38B09D] text-white font-montserrat font-medium rounded-full shadow-lg hover:bg-[#006064] transition-all duration-300 min-w-[200px]"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 96, 100, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Solutions
              </motion.button>
              
              <motion.button
                onClick={scrollToAbout}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-montserrat font-medium rounded-full hover:bg-white hover:text-[#006064] transition-all duration-300 min-w-[200px]"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Algae
              </motion.button>
            </motion.div>
          </div>
          
          {/* Statistics counter section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <StatisticsCounter />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <ScrollIndicator targetId="about" />
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <WaveDivider />
      </div>
    </section>
  );
};

export default HeroSection;
