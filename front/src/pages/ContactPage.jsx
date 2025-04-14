import React from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { Mail, Phone, Clock, MessageSquare, MapPin, Users } from 'lucide-react';

const ContactPage = () => {
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
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: 1.1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-24 bg-gradient-to-b from-pink-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-8" variants={itemVariants}>
          <BackButton />
        </motion.div>
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get in touch with our pregnancy support specialists
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <Mail className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
            </div>
            <p className="mt-2 text-gray-600">support@maatrcare.com</p>
            <p className="mt-1 text-gray-600">pregnancy@maatrcare.com (Pregnancy-specific queries)</p>
            <p className="mt-4 text-sm text-gray-500">Response time: Within 24 hours</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <Phone className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
            </div>
            <p className="mt-2 text-gray-600">General: +1 (555) 123-4567</p>
            <p className="mt-1 text-gray-600">Pregnancy Helpline: +1 (555) 789-0123</p>
            <p className="mt-4 text-sm text-gray-500">24/7 emergency pregnancy support available</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <Clock className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
            </div>
            <p className="mt-2 text-gray-600">Monday - Friday: 9AM - 5PM</p>
            <p className="mt-1 text-gray-600">Saturday: 10AM - 2PM</p>
            <p className="mt-4 text-sm text-gray-500">Closed on Sundays and public holidays</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <MessageSquare className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
            </div>
            <p className="mt-2 text-gray-600">Available on our app and website</p>
            <p className="mt-1 text-gray-600">Chat with certified pregnancy specialists</p>
            <p className="mt-4 text-sm text-gray-500">Available 8AM - 8PM daily</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <MapPin className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
            </div>
            <p className="mt-2 text-gray-600"> Maternal Health Street</p>
            <p className="mt-1 text-gray-600">Bengaluru, Karnataka, India</p>
            <p className="mt-4 text-sm text-gray-500">By appointment only</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                className="bg-rose-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
                <Users className="h-6 w-6 text-rose-500" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">Support Groups</h3>
            </div>
            <p className="mt-2 text-gray-600">Join our pregnancy support community</p>
            <p className="mt-1 text-gray-600">Weekly virtual meetups: Tuesdays at 7PM</p>
            <p className="mt-4 text-sm text-gray-500">Register through the MaatrCare app</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-white p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Us a Message</h3>
          <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div whileHover={{ scale: 1.02 }} className="sm:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="sm:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="sm:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" id="subject" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"></textarea>
            </motion.div>
            <motion.div className="sm:col-span-2">
              <motion.button 
                type="submit" 
                className="w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Pregnancy Support Promise</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At MaatrCare, we understand the importance of reliable support during your pregnancy journey. 
            Our team of certified healthcare professionals is committed to providing you with accurate information, 
            timely assistance, and compassionate care throughout your pregnancy and beyond.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
