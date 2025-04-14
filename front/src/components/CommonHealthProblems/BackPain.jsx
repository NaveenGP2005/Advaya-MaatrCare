import React from 'react';
import { motion } from 'framer-motion';

const exercises = [
  {
    step: 1,
    description: 'Start on all fours with knees under hips, hands under shoulders, fingers facing forwards and stomach muscles lifted to keep your back straight.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    step: 2,
    description: 'Pull in your stomach muscles and raise your back up towards the ceiling, letting your head and bum relax downwards gently – do not let your elbows lock and only move your back as far as you comfortably can.',
    image: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&q=80&w=800'
  },
  {
    step: 3,
    description: 'Hold for a few seconds then slowly return to the box position – take care not to hollow your back, it should always return to a straight, neutral position.',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18ad?auto=format&fit=crop&q=80&w=800'
  },
  {
    step: 4,
    description: 'Do this slowly and rhythmically 10 times, making your muscles work hard and moving your back carefully.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800'
  }
];

const preventionTips = [
  'Bend your knees when lifting',
  'Avoid heavy objects',
  'Move feet when turning',
  'Wear flat shoes',
  'Balance shopping weight',
  'Keep back straight when sitting',
  'Get enough rest',
  'Take warm baths',
  'Use supportive mattress'
];

const BackPain = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Back Pain in Pregnancy</h3>
        <p className="text-gray-600">
          Back pain is very common during pregnancy, especially in the early stages. During pregnancy, your body's ligaments naturally become softer and stretch to prepare you for labour, which can strain your lower back and pelvis joints.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Prevention Tips</h4>
            <ul className="space-y-3">
              {preventionTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center text-gray-600"
                >
                  <span className="h-2 w-2 bg-rose-500 rounded-full mr-2" />
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">When to Seek Medical Help</h4>
            <div className="space-y-4">
              <div className="bg-rose-50 p-4 rounded-lg">
                <h5 className="font-medium text-rose-900 mb-2">Contact your doctor or visit the nearest hospital if you:</h5>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-rose-500 rounded-full mr-2 mt-2" />
                    <span>Experience severe pain in your second or third trimester</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-rose-500 rounded-full mr-2 mt-2" />
                    <span>Have a fever or notice any bleeding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-rose-500 rounded-full mr-2 mt-2" />
                    <span>Feel pain or burning while urinating</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-rose-500 rounded-full mr-2 mt-2" />
                    <span>Have persistent pain under your ribs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-medium text-red-900 mb-2">Call 108 (Ambulance) or rush to the nearest hospital immediately if you:</h5>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-2 mt-2" />
                    <span>Lose sensation in your legs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-2 mt-2" />
                    <span>Lose feeling in your buttocks or genitals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">Recommended Exercises</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <img
                  src={exercise.image}
                  alt={`Exercise step ${exercise.step}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Step {exercise.step}</h5>
                  <p className="text-gray-600 text-sm">{exercise.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BackPain;