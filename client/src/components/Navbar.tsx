import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  return (
    <nav className={`fixed w-full z-50 ${isScrolled ? "bg-white shadow-md" : "bg-white bg-opacity-95"} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#38B09D] flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-montserrat font-bold text-[#006064] text-xl">ProAlgaeTech</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("home")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors">Home</button>
            <button onClick={() => scrollToSection("about")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors">About</button>
            <button onClick={() => scrollToSection("mission")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors">Mission</button>
            <button onClick={() => scrollToSection("services")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors">Services</button>
            <button onClick={() => scrollToSection("contact")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors">Contact</button>
          </div>
          <div className="md:hidden">
            <button className="text-[#006064]" onClick={toggleMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="flex flex-col px-4 py-3 space-y-3">
          <button onClick={() => scrollToSection("home")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors text-left">Home</button>
          <button onClick={() => scrollToSection("about")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors text-left">About</button>
          <button onClick={() => scrollToSection("mission")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors text-left">Mission</button>
          <button onClick={() => scrollToSection("services")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors text-left">Services</button>
          <button onClick={() => scrollToSection("contact")} className="font-medium text-[#006064] hover:text-[#38B09D] transition-colors text-left">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
