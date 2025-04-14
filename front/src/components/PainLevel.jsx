import React, { useState } from "react";
import axios from "axios";
import BackButton from './BackButton';
import { motion, AnimatePresence } from "framer-motion";

function PainLevel() {
  const [formData, setFormData] = useState({
    baseline_fhr: "",
    variability: "",
    accelerations: "",
    decelerations: ""
  });
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/predict", formData);
      setResult(res.data.pain_level);
    } catch (error) {
      console.error("Error predicting pain level:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#e91e63",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const resultVariants = {
    hidden: { opacity: 0, y: -20 },
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
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(240, 98, 146, 0.3)",
      borderColor: "#e91e63",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          
        </div>
        <motion.div 
          style={{ 
            backgroundColor: "#fff0f5", 
            padding: "2rem", 
            borderRadius: "1rem", 
            width: "100%", 
            maxWidth: "500px", 
            margin: "2rem auto", 
            fontFamily: "'Segoe UI', sans-serif", 
            boxShadow: "0 4px 12px rgba(255, 182, 193, 0.5)" 
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            style={{ color: "#d63384", textAlign: "center", marginBottom: "1.5rem" }}
            variants={itemVariants}
          >
            Pain Level Predictor
          </motion.h2>
          <form onSubmit={handleSubmit}>
            {["baseline_fhr", "variability", "accelerations", "decelerations"].map((field, index) => (
              <motion.div 
                key={field} 
                style={{ marginBottom: "1rem" }}
                variants={itemVariants}
                custom={index}
              >
                <label style={{ 
                  display: "block", 
                  color: "#c2185b", 
                  fontWeight: "bold", 
                  marginBottom: "0.3rem" 
                }}>
                  {field.replace('_', ' ').toUpperCase()}:
                </label>
                <motion.input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #f8bbd0",
                    backgroundColor: "#fffafc",
                    color: "#880e4f"
                  }}
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>
            ))}
            <motion.button 
              type="submit" 
              style={{
                width: "100%",
                padding: "0.7rem",
                backgroundColor: "#f06292",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                    borderTopColor: "white",
                    marginRight: "10px"
                  }}
                  variants={loadingVariants}
                  animate="animate"
                />
              ) : null}
              {isLoading ? "Predicting..." : "Predict"}
            </motion.button>
          </form>
          <AnimatePresence>
            {result && (
              <motion.div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "0.5rem",
                  border: "1px solid #f8bbd0"
                }}
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h3 
                  style={{
                    color: "#ad1457",
                    textAlign: "center",
                    fontSize: "1.2rem"
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Predicted Pain Level: 
                  <motion.span
                    style={{ 
                      display: "inline-block", 
                      marginLeft: "0.5rem",
                      fontWeight: "bold" 
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {result}
                  </motion.span>
                </motion.h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default PainLevel;
