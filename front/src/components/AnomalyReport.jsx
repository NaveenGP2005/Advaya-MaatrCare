import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from './BackButton';

function AnomalyReport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5001/analyze", formData);
      setResult(response.data.result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult("");
      setError("");
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
        damping: 10
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
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

  const uploadAreaVariants = {
    idle: { 
      scale: 1,
      borderColor: "rgb(249, 168, 212)",
      backgroundColor: "rgb(255, 255, 255)"
    },
    hover: { 
      scale: 1.02,
      borderColor: "rgb(236, 72, 153)",
      backgroundColor: "rgb(253, 242, 248)"
    },
    dragging: {
      scale: 1.05,
      borderColor: "rgb(219, 39, 119)",
      backgroundColor: "rgb(252, 231, 243)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.2), 0 4px 6px -2px rgba(236, 72, 153, 0.1)"
    },
    tap: { scale: 0.95 }
  };

  const fileSelectedVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const resultContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  const resultHeaderVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const resultContentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const arrowVariants = {
    idle: { x: 0 },
    hover: {
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8"
          variants={itemVariants}
        >
          
          {/* Upload Section */}
          <motion.section className="mb-8" variants={itemVariants}>
            <motion.h2 
              className="text-xl text-pink-600 font-semibold mb-4"
              variants={itemVariants}
            >
              Upload Your Report
            </motion.h2>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="w-full">
                <motion.label 
                  htmlFor="file-upload" 
                  className="block w-full cursor-pointer text-center p-6 border-2 border-dashed border-pink-300 rounded-lg"
                  variants={uploadAreaVariants}
                  initial="idle"
                  animate={isDragging ? "dragging" : file ? "hover" : "idle"}
                  whileHover="hover"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-2">
                    <motion.div 
                      className="flex justify-center"
                      variants={iconVariants}
                    >
                      <svg className="h-12 w-12 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </motion.div>
                    <div className="text-pink-600 font-medium">
                      Click to upload a file or drag and drop
                    </div>
                    <p className="text-xs text-pink-400">
                      Supported formats: PDF, JPEG, PNG
                    </p>
                  </div>
                </motion.label>
                <input 
                  id="file-upload"
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                
                <AnimatePresence>
                  {file && (
                    <motion.div 
                      className="mt-3 text-sm flex items-center justify-center text-pink-600 bg-pink-50 p-2 rounded"
                      variants={fileSelectedVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.svg 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </motion.svg>
                      <span>Selected: {file.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center">
                <motion.button 
                  type="submit" 
                  className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full shadow-md transition duration-300 flex items-center"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={loading || !file}
                >
                  <span>Analyze Report</span>
                  <motion.svg 
                    className="ml-2 h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    variants={arrowVariants}
                    initial="idle"
                    whileHover="hover"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.button>
              </div>
            </form>
          </motion.section>
          
          {/* Status Messages */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                className="flex items-center justify-center p-4 text-pink-600"
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing your report...</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-6 rounded"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex">
                  <motion.div 
                    className="flex-shrink-0"
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </motion.div>
                  <div className="ml-3">
                    <p>{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.section 
                className="mt-8"
                variants={resultContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="border border-pink-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-pink-500 to-pink-400 px-6 py-3"
                    variants={resultHeaderVariants}
                  >
                    <h3 className="text-white font-medium flex items-center text-lg">
                      <motion.span 
                        role="img" 
                        aria-label="brain" 
                        className="mr-2"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        🧠
                      </motion.span> 
                      AI Analysis Result
                    </h3>
                  </motion.div>
                  <div className="p-6">
                    <motion.div 
                      className="bg-pink-50 p-4 rounded-lg"
                      variants={resultContentVariants}
                    >
                      <pre className="whitespace-pre-wrap text-gray-700 font-sans">{result}</pre>
                    </motion.div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-white border-t border-pink-100 mt-auto"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4 py-4 text-center text-pink-400 text-sm">
          Pregnancy Scan Report Analyzer • Secure Analysis • 2025
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default AnomalyReport;
