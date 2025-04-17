import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  // Navigation menu items
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Mission", id: "mission" },
    { name: "Services", id: "services" },
    { name: "Algae Solutions", id: "services" }, // Points to services for now
    { name: "Articles", id: "mission" }, // Points to mission for now
    { name: "Contact", id: "contact" }
  ];

  const rippleAnimation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const bubbleVariants = {
    closed: { scale: 0, opacity: 0 },
    open: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    })
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gradient-to-r from-[#006064] to-[#38B09D] shadow-lg" 
          : "bg-gradient-to-r from-[#006064]/90 to-[#38B09D]/90 backdrop-blur-sm"
      }`}
      ref={navRef}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
              <span className="text-[#006064] font-bold text-xl">P</span>
            </div>
            <span className="font-montserrat font-bold text-white text-xl">ProAlgaeTech</span>
          </motion.div>
          
          <motion.div 
            className="hidden lg:flex space-x-6"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  scrollToSection(item.id);
                  rippleAnimation(e);
                }}
                className="font-medium text-white hover:text-[#80DEEA] transition-colors relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
          
          <div className="lg:hidden">
            <motion.button 
              className="text-white p-2 rounded-full"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden bg-[#006064] shadow-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col px-4 py-3 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  custom={index}
                  variants={bubbleVariants}
                  initial="closed"
                  animate="open"
                  onClick={() => scrollToSection(item.id)}
                  className="font-medium text-white hover:text-[#80DEEA] transition-colors text-left py-2 border-b border-[#80DEEA]/20"
                >
                  <span className="flex items-center">
                    <motion.span 
                      className="inline-block w-2 h-2 bg-[#80DEEA] rounded-full mr-3"
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.1 
                      }}
                    />
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
