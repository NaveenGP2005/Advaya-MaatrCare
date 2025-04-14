import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center">
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            variants={itemVariants}
          >
            <motion.span 
              className="block"
              variants={itemVariants}
            >
              Your AI-Powered
            </motion.span>
            <motion.span 
              className="block text-rose-500"
              variants={itemVariants}
            >
              Pregnancy Assistant
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            variants={itemVariants}
          >
            Empowering mothers with personalized care through AI diagnosis, nutrition guidance, and secure blockchain medical records.
          </motion.p>
          
          <motion.div 
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            variants={itemVariants}
          >
            <motion.div 
              className="rounded-md shadow"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.a 
                href="#features" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.a 
                href="#about" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-rose-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-rose-100 rounded-full opacity-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-rose-200 rounded-full opacity-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </div>
  );
};

export default Hero;
