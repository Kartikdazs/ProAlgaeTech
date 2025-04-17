import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Algal Biofuel Production",
      description: "Large-scale cultivation system for high-lipid algae strains optimized for biofuel production.",
      imageUrl: "https://images.unsplash.com/photo-1635146037526-a75e6905ad78?q=80&w=1024&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Wastewater Remediation",
      description: "Algae-based system for municipal wastewater treatment with nutrient recovery.",
      imageUrl: "https://images.unsplash.com/photo-1594761051383-adbe9a87ecd4?q=80&w=1024&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Nutritional Supplements",
      description: "Development of high-protein algae powder for nutritional supplements and food products.",
      imageUrl: "https://images.unsplash.com/photo-1586962358070-16a0f05b8e67?q=80&w=1024&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Carbon Capture System",
      description: "Industrial-scale algae photobioreactors designed for carbon dioxide capture and utilization.",
      imageUrl: "https://images.unsplash.com/photo-1518504235225-4df9427de278?q=80&w=1024&auto=format&fit=crop"
    }
  ];
  
  // Navigate between carousel slides
  const goToSlide = (index: number) => {
    let newIndex = index;
    
    if (index < 0) {
      newIndex = projects.length - 1;
    } else if (index >= projects.length) {
      newIndex = 0;
    }
    
    setCurrentIndex(newIndex);
  };
  
  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };
  
  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };
  
  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(0);
    }
  };
  
  // Light rays animation effect
  const LightRays = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          style={{
            left: `${index * 20}%`,
            rotate: `${index * 5}deg`,
            originY: 0
          }}
          animate={{
            x: [0, 300, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 15 + index * 3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2
          }}
        />
      ))}
    </div>
  );
  
  // Autoplay carousel
  useEffect(() => {
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex]);
  
  // Pause autoplay on hover/touch
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };
  
  const resumeAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };
  
  return (
    <section id="projects" className="py-20 relative bg-[#006064] text-white overflow-hidden">
      <LightRays />
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">Our Projects</h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80">
            Explore our innovative algae projects making an impact across various industries.
          </p>
        </motion.div>
        
        {/* Carousel */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onTouchStart={pauseAutoplay}
          onTouchEnd={resumeAutoplay}
        >
          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-xl shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div 
              className="relative h-[500px] transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="absolute flex">
                {projects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    className="w-screen max-w-6xl relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentIndex ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="h-[500px] bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#006064] to-transparent opacity-80"></div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-8 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: index === currentIndex ? 1 : 0,
                          y: index === currentIndex ? 0 : 20 
                        }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">{project.title}</h3>
                        <p className="text-white/90 max-w-2xl">{project.description}</p>
                        
                        <motion.button
                          className="mt-6 px-6 py-2 bg-white text-[#006064] rounded-full font-medium hover:bg-[#80DEEA] transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            onClick={prevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            onClick={nextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          
          {/* Bubble indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: index === currentIndex ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* "View All Projects" link */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#"
            className="inline-block text-white font-medium text-lg relative group"
            whileHover={{ scale: 1.05 }}
          >
            View All Projects
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Bottom bubbles decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-20 pointer-events-none">
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute bottom-0 rounded-full bg-white/10"
            style={{
              left: `${(index / 12) * 100}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
            }}
            animate={{
              y: [0, -(Math.random() * 40 + 30), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;