import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nutritionData = {
  first: {
    recommended: [
      {
        category: 'Folate-rich foods',
        items: ['Spinach', 'Lentils', 'Chickpeas', 'Fortified cereals'],
        benefits: 'Essential for neural tube development',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin B6 foods',
        items: ['Bananas', 'Potatoes', 'Poultry'],
        benefits: 'Helps reduce nausea',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Iron-rich foods',
        items: ['Lean meats', 'Beans', 'Tofu', 'Leafy greens'],
        benefits: 'For oxygen supply',
        image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Omega-3 fatty acids',
        items: ['Chia seeds', 'Flaxseeds', 'Walnuts'],
        benefits: 'For brain development',
        image: 'https://images.unsplash.com/photo-1514575110897-1253ff7b2ccb?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Hydrating foods',
        items: ['Coconut water', 'Watermelon', 'Cucumber'],
        benefits: 'Maintains hydration',
        image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  second: {
    recommended: [
      {
        category: 'Protein-rich foods',
        items: ['Eggs', 'Dairy', 'Fish'],
        benefits: 'For fetal muscle & tissue growth',
        image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Calcium-rich foods',
        items: ['Milk', 'Yogurt', 'Cheese', 'Sesame seeds'],
        benefits: 'For bone development',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin C foods',
        items: ['Oranges', 'Bell peppers', 'Tomatoes'],
        benefits: 'Helps iron absorption',
        image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Whole grains',
        items: ['Brown rice', 'Quinoa', 'Whole wheat bread'],
        benefits: 'Sustained energy',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Magnesium foods',
        items: ['Almonds', 'Cashews', 'Pumpkin seeds'],
        benefits: 'Prevents leg cramps',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  third: {
    recommended: [
      {
        category: 'Fiber-rich foods',
        items: ['Oats', 'Apples', 'Pears', 'Lentils'],
        benefits: 'Prevents constipation',
        image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Healthy fats',
        items: ['Avocado', 'Olive oil', 'Ghee'],
        benefits: 'Supports brain & nervous system',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin K-rich foods',
        items: ['Leafy greens', 'Broccoli'],
        benefits: 'Helps with blood clotting during labor',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Iron & protein sources',
        items: ['Lean red meat', 'Spinach', 'Eggs'],
        benefits: 'Prevents anemia',
        image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Hydration & digestion support',
        items: ['Herbal teas', 'Ginger', 'Fennel seeds'],
        benefits: 'Supports digestion',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
};

const foodsToAvoid = [
  {
    category: 'Raw or undercooked foods',
    items: ['Raw meat', 'Raw eggs', 'Raw fish'],
    reason: 'Risk of salmonella & toxoplasmosis',
  },
  {
    category: 'High-mercury fish',
    items: ['Shark', 'Swordfish', 'King mackerel'],
    reason: 'Harms fetal brain development',
  },
  {
    category: 'Unpasteurized products',
    items: ['Raw milk', 'Soft cheeses', 'Unpasteurized juices'],
    reason: 'Risk of listeria infection',
  },
  {
    category: 'Caffeine & stimulants',
    items: ['Excess coffee', 'Energy drinks'],
    reason: 'More than 200mg/day linked to low birth weight',
  },
  {
    category: 'Other items to avoid',
    items: ['Alcohol', 'Raw sprouts', 'Processed foods', 'Artificial sweeteners'],
    reason: 'Various risks to fetal development',
  },
];

const NutritionSection = () => {
  const [selectedTrimester, setSelectedTrimester] = useState('first');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { recommended } = nutritionData[selectedTrimester];

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

  const tagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: i * 0.05,
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }
    }),
    hover: { 
      y: -5,
      backgroundColor: "#FEE2E2", // Lighter rose color
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
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

  return (
    <div id="nutrition" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pregnancy Nutrition Guide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Essential nutrients for a healthy pregnancy and baby development.
          </p>
        </motion.div>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['first', 'second', 'third'].map((trimester, index) => (
              <motion.button
                key={trimester}
                onClick={() => setSelectedTrimester(trimester)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  selectedTrimester === trimester
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {`Trimester ${index + 1} (${trimester.charAt(0).toUpperCase() + trimester.slice(1)})`}
              </motion.button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            key={selectedTrimester}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              <div className="p-6">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                  variants={titleVariants}
                >
                  <motion.span 
                    className="text-2xl mr-2"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 15, 0, 15, 0] }}
                    transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
                  >
                    ✅
                  </motion.span>
                  Recommended Foods
                </motion.h3>
                <div className="space-y-6">
                  {recommended.map((category, categoryIndex) => (
                    <motion.div 
                      key={category.category} 
                      className="bg-gray-50 rounded-lg overflow-hidden"
                      variants={cardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredCategory(`rec-${categoryIndex}`)}
                      onHoverEnd={() => setHoveredCategory(null)}
                    >
                      <div className="overflow-hidden">
                        <motion.img
                          src={category.image}
                          alt={`${category.category} - recommended foods`}
                          className="w-full h-48 object-cover"
                          variants={imageVariants}
                          whileHover="hover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {category.items.map((item, i) => (
                              <motion.span
                                key={item}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium break-words bg-rose-100 text-rose-800"
                                custom={i}
                                variants={tagVariants}
                                initial="hidden"
                                animate={hoveredCategory === `rec-${categoryIndex}` ? "visible" : "hidden"}
                                whileHover="hover"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                          <motion.p 
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {category.benefits}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              <div className="p-6">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                  variants={titleVariants}
                >
                  <motion.span 
                    className="text-2xl mr-2"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -15, 0, -15, 0] }}
                    transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    ❌
                  </motion.span>
                  Foods to Avoid
                </motion.h3>
                <div className="space-y-6">
                  {foodsToAvoid.map((category, categoryIndex) => (
                    <motion.div 
                      key={category.category} 
                      className="bg-gray-50 rounded-lg p-4"
                      variants={cardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredCategory(`avoid-${categoryIndex}`)}
                      onHoverEnd={() => setHoveredCategory(null)}
                    >
                      <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {category.items.map((item, i) => (
                            <motion.span
                              key={item}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium break-words bg-red-100 text-red-800"
                              custom={i}
                              variants={tagVariants}
                              initial="hidden"
                              animate={hoveredCategory === `avoid-${categoryIndex}` ? "visible" : "hidden"}
                              whileHover="hover"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                        <motion.p 
                          className="text-sm text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {category.reason}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-500 italic">
              Always consult with your healthcare provider about your specific nutritional needs during pregnancy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSection;
