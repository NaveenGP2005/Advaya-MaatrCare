import React, { useState } from 'react';
import BackPain from './BackPain';
import StomachPain from './StomachPain';
import { motion, AnimatePresence } from 'framer-motion';

const healthCategories = [
  {
    id: 'back-pain',
    title: 'Back Pain',
    description: 'Common causes and remedies for back pain during pregnancy',
    component: BackPain,
  },
  {
    id: 'stomach-pain',
    title: 'Stomach Pain',
    description: 'Understanding abdominal pain during pregnancy',
    component: StomachPain,
  },
];

const CommonHealthProblems = () => {
  const [selectedCategory, setSelectedCategory] = useState(healthCategories[0]);

  return (
    <div id="health-problems" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Common Health Problems During Pregnancy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Learn about common health issues and how to manage them safely during pregnancy.
          </p>
        </motion.div>

        <div className="mt-12">
          <div className="flex justify-center space-x-4 mb-12">
            {healthCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  selectedCategory.id === category.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <selectedCategory.component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommonHealthProblems;