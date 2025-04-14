import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from './BackButton';

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [userId, setUserId] = useState('67fb78734d906ccfbec0fc25');  // Assuming userId is either stored or retrieved from context/session
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Fetch the list of doctors from the backend
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  const bookAppointment = async () => {
    // Validate if userId, doctorId, date, and time are filled
    const email=localStorage.getItem('email');
    if (!userId || !doctorId || !date || !time) {
      alert('Please fill all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Add the token here
        },
        body: JSON.stringify({
          userId,     // Make sure userId is not empty
          doctorId,
          time,
          date,
         email
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setDoctorId('');
          setDate('');
          setTime('');
        }, 3000);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      alert('Error booking appointment.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(236, 72, 153, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    focus: {
      boxShadow: "0px 0px 8px rgba(236, 72, 153, 0.4)",
      borderColor: "#ec4899",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <div className="mb-6">
          <BackButton />
        </div>
        <motion.div
          className="w-full bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{ boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <motion.div
            className="bg-pink-500 p-6"
            initial={{ backgroundColor: "#ec4899" }}
            animate={{
              backgroundColor: ["#ec4899", "#db2777", "#ec4899"],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <motion.h1
              className="text-2xl font-bold text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Book Your Doctor Appointment
            </motion.h1>
          </motion.div>

          <motion.div
            className="p-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <label className="block text-sm font-medium text-pink-700">Select Doctor</label>
              <motion.select
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.01 }}
              >
                <option value="">Choose a Doctor</option>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} - {doc.specialization}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label className="block text-sm font-medium text-pink-700">Appointment Date</label>
              <motion.input
                type="date"
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.01 }}
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label className="block text-sm font-medium text-pink-700">Appointment Time</label>
              <motion.input
                type="time"
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.01 }}
              />
            </motion.div>

            <motion.button
              className="w-full bg-pink-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
              onClick={bookAppointment}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={isLoading ? "loading" : ""}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <motion.span
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </motion.span>
              ) : (
                "Book Appointment"
              )}
            </motion.button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  >
                    <svg className="w-6 h-6 mx-auto text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  Appointment booked successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="bg-pink-100 px-8 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.p
              className="text-sm text-pink-800 text-center"
              whileHover={{ scale: 1.01 }}
            >
              Need help? Contact our support team at support@doctorapp.com
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
