import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import PregnancyWeightTracker from '../components/PregnancyWeightTracker';

const PersonalSpacePage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-04-15', doctor: 'Dr. Smith', type: 'Checkup' },
    { id: 2, date: '2025-05-01', doctor: 'Dr. Johnson', type: 'Ultrasound' },
    { id: 3, date: '2025-05-20', doctor: 'Dr. Williams', type: 'Blood Test' },
  ]);

  const [preferences, setPreferences] = useState({
    notifications: true,
    language: 'English',
    theme: 'Light',
  });

  const toggleNotifications = () => {
    setPreferences(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  const changeLanguage = (lang) => {
    setPreferences(prev => ({ ...prev, language: lang }));
  };

  const changeTheme = (theme) => {
    setPreferences(prev => ({ ...prev, theme: theme }));
  };

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

  return (
    <motion.div 
      className="min-h-screen py-24 bg-white"
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
            Personal Space
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your private area for personal health records and preferences
          </p>
        </motion.div>
        <motion.div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2" variants={containerVariants}>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-900">Appointment History</h3>
            <div className="mt-4 space-y-4">
              {appointments.map(appointment => (
                <motion.div 
                  key={appointment.id} 
                  className="bg-gray-50 p-4 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <p className="font-semibold">{appointment.date}</p>
                  <p>{appointment.doctor} - {appointment.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <motion.input 
                    type="checkbox" 
                    checked={preferences.notifications}
                    onChange={toggleNotifications}
                    className="form-checkbox h-5 w-5 text-rose-500"
                    whileTap={{ scale: 0.9 }}
                  />
                  <span>Enable Notifications</span>
                </label>
              </div>
              <div>
                <label className="block mb-2">Language</label>
                <motion.select 
                  value={preferences.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="form-select mt-1 block w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </motion.select>
              </div>
              <div>
                <label className="block mb-2">Theme</label>
                <div className="flex space-x-4">
                  {['Light', 'Dark'].map(theme => (
                    <motion.button
                      key={theme}
                      onClick={() => changeTheme(theme)}
                      className={`px-4 py-2 rounded-md ${
                        preferences.theme === theme 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {theme}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Pregnancy Weight Tracker Component */}
          <motion.div variants={itemVariants} className="sm:col-span-2">
            <PregnancyWeightTracker />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalSpacePage;