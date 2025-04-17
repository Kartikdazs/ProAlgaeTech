import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#80DEEA] bg-opacity-30 mx-auto overflow-hidden relative"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1519044337281-9ca449b9b4cd"
                  alt="Algae under microscope" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006064] to-transparent opacity-30"></div>
              </motion.div>
              <motion.div 
                className="w-32 h-32 rounded-full bg-[#38B09D] bg-opacity-20 absolute -top-4 -right-4 md:right-10 z-0"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div 
                className="w-24 h-24 rounded-full bg-[#006064] bg-opacity-20 absolute -bottom-4 -left-4 md:left-10 z-0"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-16"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-6">About ProAlgaeTech</h2>
            <p className="text-lg mb-6">
              ProAlgaeTech is a pioneering biotechnology company dedicated to researching, developing, and implementing 
              algae-based solutions for a sustainable future. Our innovative approaches harness the power of these remarkable 
              organisms to address global challenges in energy, nutrition, and environmental conservation.
            </p>
            <p className="text-lg mb-6">
              With a team of passionate scientists and industry experts, we're at the forefront of algal biotechnology, 
              creating solutions that benefit both people and planet.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#38B09D] flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M15 3h6v6M14 10l7-7M21 16v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5M14 14H9v-5" />
                  <circle cx="6.5" cy="17.5" r="2.5" />
                </svg>
              </div>
              <p className="font-medium">Pioneering research since 2015</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
