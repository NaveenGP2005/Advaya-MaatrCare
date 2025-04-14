import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const trimesterVideos = {
  first: [
    {
      title: 'Month-by-Month Workout: 1st Trimester',
      description: 'Comprehensive workout tailored for the first trimester',
      url: 'https://www.youtube.com/watch?v=U5CwY4Lo4dg',
    },
    {
      title: '15-Minute Prenatal Yoga | First Trimester',
      description: 'Quick yoga session for hormonal changes and discomforts',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
  second: [
    {
      title: 'Second Trimester Prenatal Fitness HIIT Workout',
      description: 'HIIT workout with resistance bands and hand weights',
      url: 'https://theeverymom.com/best-pregnancy-workouts-on-youtube/',
    },
    {
      title: 'Yoga for Pregnancy in the Second Trimester',
      description: '30-minute yoga flow with breathing techniques',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
  third: [
    {
      title: '20-Minute Full-Body Pregnancy Workout',
      description: 'Full-body workout suitable for the third trimester',
      url: 'https://www.youtube.com/watch?v=jiZ3eqenywc',
    },
    {
      title: 'Prenatal Yoga Routine: Gift Of Life',
      description: 'Gentle yoga routine for childbirth preparation',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
};

const ExerciseVideos = () => {
  const [activeTab, setActiveTab] = useState('first');
  const [hoveredCard, setHoveredCard] = useState(null);
  const constraintsRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const tabVariants = {
    inactive: { 
      color: "#6B7280", 
      borderColor: "transparent",
      y: 0
    },
    active: { 
      color: "#BE185D", 
      borderColor: "#BE185D",
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    hover: { 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
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

  const arrowVariants = {
    rest: { x: 0 },
    hover: { 
      x: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.3
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

  const getTrimesterColor = (trimester) => {
    switch(trimester) {
      case 'first': return 'from-rose-400 to-rose-500';
      case 'second': return 'from-purple-400 to-purple-500';
      case 'third': return 'from-blue-400 to-blue-500';
      default: return 'from-rose-400 to-rose-500';
    }
  };

  return (
    <div id="exercise-videos" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Exercise Videos by Trimester
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Safe and effective workout videos for each stage of your pregnancy.
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16">
          <div className="flex justify-center mb-12">
            <div className="border-b border-gray-200 flex space-x-8">
              {Object.keys(trimesterVideos).map((trimester) => (
                <motion.button
                  key={trimester}
                  onClick={() => setActiveTab(trimester)}
                  className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                    activeTab === trimester ? 'text-rose-500 border-rose-500' : 'text-gray-500 border-transparent'
                  }`}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === trimester ? "active" : "inactive"}
                  whileHover="hover"
                >
                  {trimester.charAt(0).toUpperCase() + trimester.slice(1)} Trimester
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div 
            className="overflow-hidden"
            ref={constraintsRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {trimesterVideos[activeTab].map((video, index) => (
                <motion.div 
                  key={video.title} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  variants={cardVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(`${activeTab}-${index}`)}
                  onHoverEnd={() => setHoveredCard(null)}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.1}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                >
                  <div className={`h-2 bg-gradient-to-r ${getTrimesterColor(activeTab)}`}></div>
                  <div className="p-6">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredCard === `${activeTab}-${index}` ? 1.02 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <h4 className="text-xl font-semibold text-gray-900">{video.title}</h4>
                      <p className="mt-2 text-gray-600">{video.description}</p>
                      <motion.a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-rose-500 hover:text-rose-600"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Watch Video
                        <motion.svg 
                          className="ml-2 w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          variants={arrowVariants}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-500 italic">
              Always consult with your healthcare provider before starting any new exercise routine during pregnancy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseVideos;
