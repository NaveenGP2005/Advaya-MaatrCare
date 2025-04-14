import React, { useState } from 'react';
import { motion } from 'framer-motion';

const exercises = [
  {
    trimester: 'First Trimester',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    exercises: ['Walking', 'Pelvic Tilts', 'Cat-Cow Stretch', 'Seated Leg Lifts'],
  },
  {
    trimester: 'Second Trimester',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    exercises: ['Swimming', 'Prenatal Pilates', 'Squats', 'Kegel Exercises'],
  },
  {
    trimester: 'Third Trimester',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    exercises: ['Pelvic Rocking', 'Butterfly Stretch', 'Deep Breathing', 'Gentle Walking'],
  },
];

const ExerciseSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "#be185d", // darker rose color
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
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

  return (
    <div id="exercise" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Safe Pregnancy Exercises
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Trimester-specific exercises to keep you and your baby healthy.
          </p>
        </motion.div>

        <motion.div 
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {exercises.map((item, index) => (
              <motion.div 
                key={item.trimester} 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div className="overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.trimester} 
                    className="w-full h-48 object-cover"
                    variants={imageVariants}
                    whileHover="hover"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.h3 
                    className="text-lg font-medium text-gray-900"
                    variants={titleVariants}
                  >
                    {item.trimester}
                  </motion.h3>
                  <motion.ul className="mt-4 space-y-2">
                    {item.exercises.map((exercise, exerciseIndex) => (
                      <motion.li 
                        key={exercise} 
                        className="flex items-center text-gray-600"
                        variants={listItemVariants}
                        initial="hidden"
                        animate={hoveredCard === index ? "visible" : "hidden"}
                        transition={{ delay: exerciseIndex * 0.1 }}
                      >
                        <motion.span 
                          className="h-2 w-2 bg-rose-500 rounded-full mr-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: exerciseIndex * 0.1 + 0.1 }}
                        ></motion.span>
                        {exercise}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.button 
                    className="mt-6 w-full bg-rose-500 text-white px-4 py-2 rounded-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExerciseSection;
