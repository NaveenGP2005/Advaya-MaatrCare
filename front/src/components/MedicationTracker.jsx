import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from './BackButton';

export default function MedicationTracker() {
  const [form, setForm] = useState({ name: '', dosage: '', time: '' });
  const [meds, setMeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredMed, setHoveredMed] = useState(null);

  const fetchMeds = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/medications');
      setMeds(res.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMed = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/medications/${id}`);
      fetchMeds();
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/medications', form);
      setForm({ name: '', dosage: '', time: '' });
      fetchMeds();
    } catch (error) {
      console.error('Error adding medication:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const markAsTaken = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/medications/${id}/take`);
      fetchMeds();
    } catch (error) {
      console.error('Error marking medication as taken:', error);
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMedsAndNotify();
    }, 60000); // 1 min
    fetchMedsAndNotify(); // initial load
    return () => clearInterval(interval);
  }, []);

  const fetchMedsAndNotify = async () => {
    try {
      const res = await axios.get('http://localhost:5000/medications');
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const medsList = res.data;

      medsList.forEach((med) => {
        if (!med.taken && med.time === currentTime) {
          new Notification(`💊 Reminder: ${med.name}`, {
            body: `Take ${med.name} (${med.dosage}) now!`,
            icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png'
          });
        }
      });

      setMeds(medsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching medications for notification:', error);
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { 
        duration: 0.3 
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(249, 168, 212, 0.3), 0 4px 6px -4px rgba(249, 168, 212, 0.3)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
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
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const pillIconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, 15, 0, -15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-pink-50 to-pink-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <motion.div 
          className="bg-white shadow-xl rounded-2xl p-8 mb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-extrabold text-center text-pink-600 mb-8 flex items-center justify-center"
            variants={titleVariants}
          >
            <motion.span
              variants={pillIconVariants}
              initial="initial"
              animate="animate"
              className="inline-block mr-2"
            >
              💊
            </motion.span>
            Medication Tracker
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={formItemVariants}>
              <label className="block text-pink-700 mb-1 font-medium">Medicine Name</label>
              <input
                className="w-full border border-pink-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-200"
                placeholder="e.g. Paracetamol"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="block text-pink-700 mb-1 font-medium">Dosage</label>
              <input
                className="w-full border border-pink-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-200"
                placeholder="e.g. 500mg"
                value={form.dosage}
                onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="block text-pink-700 mb-1 font-medium">Time</label>
              <input
                type="time"
                className="w-full border border-pink-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-200"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </motion.div>

            <motion.button 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </motion.span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-1">➕</span> Add Medication
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          className="bg-white shadow-xl rounded-2xl p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl font-bold text-pink-600 mb-6 flex items-center"
            variants={titleVariants}
          >
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="mr-2"
            >
              📋
            </motion.span>
            Your Medications
          </motion.h2>

          {isLoading ? (
            <motion.div 
              className="flex justify-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="animate-spin h-10 w-10 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
          ) : meds.length === 0 ? (
            <motion.p 
              className="text-center text-gray-500 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No medications added yet 💤
            </motion.p>
          ) : (
            <motion.ul 
              className="space-y-4"
              variants={containerVariants}
            >
              <AnimatePresence>
                {meds.map((med) => (
                  <motion.li
                    key={med._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-pink-50 p-4 rounded-xl border border-pink-200 shadow-sm transition-all"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    onHoverStart={() => setHoveredMed(med._id)}
                    onHoverEnd={() => setHoveredMed(null)}
                    layout
                  >
                    <div>
                      <motion.h3 
                        className="text-lg font-semibold text-pink-800"
                        initial={{ opacity: 1 }}
                        animate={{ 
                          opacity: med.taken ? 0.7 : 1,
                          textDecoration: med.taken ? "line-through" : "none"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {med.name}
                      </motion.h3>
                      <p className="text-sm text-pink-700">{med.dosage} at {med.time}</p>
                    </div>
                    <div className="flex space-x-2 mt-3 sm:mt-0">
                      <motion.button
                        onClick={() => markAsTaken(med._id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          med.taken
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-pink-500 text-white hover:bg-pink-600'
                        }`}
                        disabled={med.taken}
                        variants={buttonVariants}
                        whileHover={!med.taken ? "hover" : ""}
                        whileTap={!med.taken ? "tap" : ""}
                      >
                        {med.taken ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            ✓ Taken
                          </motion.span>
                        ) : 'Take Now'}
                      </motion.button>

                      <motion.button
                        onClick={() => deleteMed(med._id)}
                        className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium transition"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        🗑️ Delete
                      </motion.button>
                    </div>
                    
                    {hoveredMed === med._id && !med.taken && (
                      <motion.div 
                        className="absolute -right-2 -top-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        Don't forget!
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
          
          <motion.div 
            className="mt-8 text-center text-sm text-pink-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Stay healthy! Remember to take your medications on time.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
