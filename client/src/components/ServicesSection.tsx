import { motion } from "framer-motion";
import WaveDivider from "./WaveDivider";

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6v11h-6z" />
          <path d="M9 14h6" />
          <path d="M15 14a3 3 0 1 1-6 0" />
        </svg>
      ),
      title: "Research & Development",
      description: "Cutting-edge research on algae strains, cultivation techniques, and application development."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 6v10a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3V6" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
      title: "Biofuel Production",
      description: "Sustainable algae-based biofuels that offer a viable alternative to fossil fuels."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          <path d="M8 7.5c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5S14.2 5 12 5s-4 1.1-4 2.5z" />
        </svg>
      ),
      title: "Nutrition Solutions",
      description: "Nutrient-rich algae products for food supplements, animal feed, and agricultural applications."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 9c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4 0-1 .8-2 2-2s2 .9 2 2c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6Z" />
          <path d="m21 15-3.2-3.2a1 1 0 0 0-1.4 0l-5.4 5.4a1 1 0 0 0 0 1.4l3.2 3.2a1 1 0 0 0 1.4 0l5.4-5.4a1 1 0 0 0 0-1.4Z" />
          <path d="M11.3 11.7a3 3 0 0 0-4.3 0L3 16l5 5 4.3-4.3a3.1 3.1 0 0 0 0-4.4Z" />
        </svg>
      ),
      title: "Environmental Services",
      description: "Algae-based solutions for wastewater treatment, carbon capture, and ecosystem restoration."
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-4">Our Services</h2>
          <p className="text-lg max-w-3xl mx-auto">
            ProAlgaeTech offers a comprehensive range of algae-based solutions and services
            designed to meet diverse industry needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="icon-container w-16 h-16 rounded-full bg-[#80DEEA] flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#006064" }}
              >
                <div className="text-[#006064] text-2xl group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-montserrat font-bold text-[#006064] mb-3 text-center">{service.title}</h3>
              <p className="text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <WaveDivider />
      </div>
    </section>
  );
};

export default ServicesSection;
