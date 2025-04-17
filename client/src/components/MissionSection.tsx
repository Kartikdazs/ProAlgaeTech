import { motion } from "framer-motion";
import BubbleEffect from "./BubbleEffect";

const MissionSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5,
      }
    })
  };

  return (
    <section id="mission" className="py-20 relative bg-gradient-to-b from-white to-[#80DEEA]/30">
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-montserrat font-bold text-[#006064] mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Vision & Mission
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We envision a world where the remarkable properties of algae are fully utilized to create 
              sustainable solutions for humanity's greatest challenges.
            </motion.p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            {/* Mission Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden max-w-sm mx-auto w-full"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38B09D] bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="text-center relative">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-[#006064] flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-montserrat font-bold text-[#006064] mb-4">Our Mission</h3>
                <p className="text-base">
                  To advance algae biotechnology through innovative research and development, creating sustainable 
                  solutions that address global challenges in food security, energy production, and environmental protection.
                </p>
              </div>
            </motion.div>
            
            {/* Background Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden max-w-sm mx-auto w-full"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38B09D] bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="text-center relative">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-[#006064] flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-montserrat font-bold text-[#006064] mb-4">Our Background</h3>
                <p className="text-base">
                  Founded by a team of biologists, engineers, and environmental scientists, ProAlgaeTech 
                  combines multidisciplinary expertise to pioneer the next generation of algae-based solutions.
                </p>
              </div>
            </motion.div>
            
            {/* Why ProAlgaeTech Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden max-w-sm mx-auto w-full"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38B09D] bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="text-center relative">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-[#006064] flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-montserrat font-bold text-[#006064] mb-4">Why ProAlgaeTech</h3>
                <p className="text-base">
                  We combine cutting-edge science with practical applications, ensuring our innovations 
                  are scalable, sustainable, and accessible to markets and communities worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <BubbleEffect />
    </section>
  );
};

export default MissionSection;
