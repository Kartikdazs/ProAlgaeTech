import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ParticleEffect from "./ParticleEffect";
import WaveDivider from "./WaveDivider";

const HeroSection = () => {
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

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden water-animate">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#80DEEA]/10 to-white opacity-50 z-0"></div>
      <ParticleEffect />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-[#006064] mb-6 leading-tight">
            Harnessing Nature's Green Potential
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#263238]">
            Algae are the diverse and potential organisms for the future economy
          </p>
          <motion.button
            onClick={scrollToAbout}
            className="inline-block px-8 py-3 bg-[#38B09D] text-white font-montserrat font-medium rounded-full shadow-lg hover:bg-[#006064] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <WaveDivider />
      </div>
    </section>
  );
};

export default HeroSection;
