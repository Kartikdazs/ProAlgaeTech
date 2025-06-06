import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

const Home = () => {
  // Add water animation effect class to body
  useEffect(() => {
    document.body.classList.add("water-animate");
    return () => {
      document.body.classList.remove("water-animate");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WaveDivider />
        <AboutSection />
        <WaveDivider />
        <MissionSection />
        <WaveDivider />
        <ServicesSection />
        <WaveDivider />
        <ProjectsShowcase />
        <WaveDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
