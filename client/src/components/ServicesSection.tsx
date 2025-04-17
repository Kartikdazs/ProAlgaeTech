import { motion } from "framer-motion";
import WaveDivider from "./WaveDivider";

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 16.98h-5.99c-1.1 0-1.95.5-2.01 1l-.02 3.02a1 1 0 0 0 1.7.7l2.8-2.4c.2-.2.41-.3.53-.3.41 0 .77.47.77 1v2a1 1 0 0 0 2 0v-5.02ZM23 11v4.98a1 1 0 0 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1h2.59L12 6.9l-3.29 3.28a1 1 0 0 1-1.42-1.41l4-4a1 1 0 0 1 1.42 0l10 10c.38.4.3 1.01-.3 1.3" />
          <path d="M13.8 5H9V1c0-.55-.45-1-1-1S7 .45 7 1v4H2.1a1 1 0 0 0 0 2.01H7v4c0 .55.45 1 1 1s1-.45 1-1V7.01h4.91a1 1 0 0 0 0-2.01" />
        </svg>
      ),
      title: "Technical Support",
      description: "Expert assistance for algae cultivation systems, including troubleshooting, maintenance, and optimization."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6v11h-6z" />
          <path d="M9 14h6" />
          <path d="M15 14a3 3 0 1 1-6 0" />
        </svg>
      ),
      title: "Algae Cultivation Consulting",
      description: "Specialized guidance on growing conditions, scaling production, and optimizing yields for various algae strains."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 2c-2.8 0-5 2.2-5 5v3c0 .3-.2.5-.5.5H4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h1.5c.3 0 .5.2.5.5v0c0 2.5 2 4.5 4.5 4.5H12" strokeMiterlimit="10" />
          <path d="M11 21c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1H11z" strokeMiterlimit="10" />
          <path d="M11 18c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1h-6z" strokeMiterlimit="10" />
          <path d="M14 4c0-1.1.9-2 2-2h2m0 0c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V4m0 0h2" />
        </svg>
      ),
      title: "Equipment Selection",
      description: "Recommendations for cultivation equipment, harvesting technology, and processing systems tailored to your needs."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      ),
      title: "Strain Isolation",
      description: "Identification and isolation of optimized algae strains for specific applications and environmental conditions."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Production Management",
      description: "Comprehensive oversight of algae production systems, from startup to scaling and continuous operation."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Expert Connection",
      description: "Access to our network of algae specialists, researchers, and industry experts for specialized consultations."
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-white overflow-hidden">
      {/* Background algae pattern watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="algaePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M30,50 Q50,20 70,50 T110,50" fill="none" stroke="#006064" strokeWidth="2" />
            <circle cx="50" cy="50" r="10" fill="#38B09D" />
            <path d="M20,20 Q35,35 20,50 T20,80" fill="none" stroke="#80DEEA" strokeWidth="2" />
            <circle cx="80" cy="20" r="5" fill="#80DEEA" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#algaePattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-4">Our Services</h2>
          <div className="flex justify-center items-center mb-4">
            <div className="w-10 h-10 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#38B09D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <circle cx="12" cy="12" r="6" />
                <path d="M12 12h.01" />
                <path d="M7 15a9 9 0 1 0 10-10" />
              </svg>
            </div>
          </div>
          <p className="text-lg max-w-3xl mx-auto">
            ProAlgaeTech offers a comprehensive range of specialized algae services
            designed to meet diverse industry needs and research requirements.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card bg-gradient-to-br from-white to-[#E0F7FA]/30 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 group border border-[#80DEEA]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="icon-container w-16 h-16 rounded-full bg-[#80DEEA] flex items-center justify-center mx-auto mb-6 transition-all duration-500"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "#006064",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-[#006064] text-2xl group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-montserrat font-bold text-[#006064] mb-3 text-center">{service.title}</h3>
              <p className="text-center text-gray-700">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-[#006064] text-white font-montserrat font-medium rounded-lg shadow-lg hover:bg-[#38B09D] transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 96, 100, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Request Consultation
          </motion.button>
        </motion.div>
      </div>
      
      {/* Wave divider and bubbles */}
      <div className="absolute bottom-0 left-0 w-full">
        <WaveDivider />
        
        {/* Animated bubbles */}
        <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-[#80DEEA]/20"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                bottom: 0,
                left: `${index * 10 + Math.random() * 5}%`,
              }}
              animate={{
                y: [0, -100 - Math.random() * 100],
                opacity: [0.7, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
