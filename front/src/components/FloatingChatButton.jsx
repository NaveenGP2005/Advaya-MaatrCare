import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingChatButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Link
        to="/chat"
        className="fixed bottom-8 right-8 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 right-16 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          initial={{ x: 20, opacity: 0 }}
          whileHover={{ 
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15
            }
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-semibold text-rose-500"
          >
            Sakhi cares
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            How can she help today?
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FloatingChatButton;
