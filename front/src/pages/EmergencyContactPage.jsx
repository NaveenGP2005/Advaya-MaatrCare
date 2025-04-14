import React from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { Phone, AlertTriangle, Heart, Stethoscope, Ambulance } from 'lucide-react';

const EmergencyContactPage = () => {
  const emergencyContacts = [
    { title: 'Emergency Hotline', number: '911', icon: <AlertTriangle size={24} /> },
    { title: 'Poison Control', number: '1-800-222-1222', icon: <Stethoscope size={24} /> },
    { title: 'Maternal Emergency', number: '1-800-MATERNAL', icon: <Heart size={24} /> },
    { title: 'Ambulance Service', number: '112', icon: <Ambulance size={24} /> },
    { title: 'OB-GYN On-Call', number: '1-888-555-OBGYN', icon: <Phone size={24} /> },
  ];

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

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <motion.div 
      className="min-h-screen py-24 bg-gradient-to-b from-rose-50 to-white"
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
            Emergency Contacts
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Immediate assistance when you need it most
          </p>
        </motion.div>
        <motion.div 
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {emergencyContacts.map((contact, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center mb-4">
                <span className="bg-rose-100 p-2 rounded-full mr-3">
                  {contact.icon}
                </span>
                <h3 className="text-lg font-medium text-gray-900">{contact.title}</h3>
              </div>
              <p className="mt-2 text-gray-600 text-xl font-bold">{contact.number}</p>
              <motion.button
                className="mt-4 w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition duration-300 flex items-center justify-center"
                onClick={() => handleCall(contact.number)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={18} className="mr-2" />
                Tap to Call
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="mt-12 bg-rose-100 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-rose-700 mb-4">Important Reminders</h3>
          <ul className="list-disc pl-5 space-y-2 text-rose-600">
            <li>Always call 112 or your local emergency number for life-threatening situations</li>
            <li>Keep your healthcare provider's contact information readily available</li>
            <li>Familiarize yourself with the signs of pregnancy complications</li>
            <li>Don't hesitate to seek medical attention if you're concerned about your health or your baby's well-being</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmergencyContactPage;
