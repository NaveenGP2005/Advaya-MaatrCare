import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const PregnancyWeightTracker = () => {
  // Initial BMI category
  const [bmiCategory, setBmiCategory] = useState('NormalBMI');
  
  // Weight tracking data
  const [weightData, setWeightData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeklyWeight, setWeeklyWeight] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [startWeightEntered, setStartWeightEntered] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info', 'success', 'warning', 'error'
  
  // Reference data for ideal weight gain by week
  const [referenceData, setReferenceData] = useState([
    {
      "Week": 1,
      "IdealGain_Underweight(kg)": 0.9,
      "IdealGain_NormalBMI(kg)": 0.85,
      "IdealGain_Overweight(kg)": 0.55
    },
    {
      "Week": 2,
      "IdealGain_Underweight(kg)": 1.3,
      "IdealGain_NormalBMI(kg)": 1.2,
      "IdealGain_Overweight(kg)": 0.8
    },
    {
      "Week": 3,
      "IdealGain_Underweight(kg)": 1.7,
      "IdealGain_NormalBMI(kg)": 1.55,
      "IdealGain_Overweight(kg)": 1.05
    },
    {
      "Week": 4,
      "IdealGain_Underweight(kg)": 2.1,
      "IdealGain_NormalBMI(kg)": 1.9,
      "IdealGain_Overweight(kg)": 1.3
    },
    {
      "Week": 5,
      "IdealGain_Underweight(kg)": 2.5,
      "IdealGain_NormalBMI(kg)": 2.25,
      "IdealGain_Overweight(kg)": 1.55
    }
  ]);

  // Extended reference data (extrapolated for weeks 6-40)
  useEffect(() => {
    // Extend the reference data for weeks 6-40 with a simple linear extrapolation
    const extendedData = [...referenceData];
    
    const lastWeek = referenceData[referenceData.length - 1].Week;
    const lastUnderweight = referenceData[referenceData.length - 1]["IdealGain_Underweight(kg)"];
    const lastNormal = referenceData[referenceData.length - 1]["IdealGain_NormalBMI(kg)"];
    const lastOverweight = referenceData[referenceData.length - 1]["IdealGain_Overweight(kg)"];
    
    // Weekly increments (simplified linear model)
    const weeklyIncrementUnderweight = 0.45;
    const weeklyIncrementNormal = 0.4;
    const weeklyIncrementOverweight = 0.3;
    
    for (let i = lastWeek + 1; i <= 40; i++) {
      const newWeekData = {
        "Week": i,
        "IdealGain_Underweight(kg)": +(lastUnderweight + (i - lastWeek) * weeklyIncrementUnderweight).toFixed(2),
        "IdealGain_NormalBMI(kg)": +(lastNormal + (i - lastWeek) * weeklyIncrementNormal).toFixed(2),
        "IdealGain_Overweight(kg)": +(lastOverweight + (i - lastWeek) * weeklyIncrementOverweight).toFixed(2)
      };
      extendedData.push(newWeekData);
    }
    
    setReferenceData(extendedData);
  }, []);

  // Handle BMI category change
  const handleBMICategoryChange = (e) => {
    setBmiCategory(e.target.value);
    analyzeWeightGain(weightData, e.target.value);
  };

  // Handle starting weight submission
  const handleStartWeightSubmit = (e) => {
    e.preventDefault();
    
    if (!startWeight || isNaN(parseFloat(startWeight)) || parseFloat(startWeight) <= 0) {
      setMessage('Please enter a valid starting weight');
      setMessageType('error');
      return;
    }
    
    setStartWeightEntered(true);
    setMessage('Starting weight recorded. You can now track your weekly weight gain.');
    setMessageType('success');
  };

  // Handle weekly weight submission
  const handleWeeklyWeightSubmit = (e) => {
    e.preventDefault();
    
    if (!weeklyWeight || isNaN(parseFloat(weeklyWeight)) || parseFloat(weeklyWeight) <= 0) {
      setMessage('Please enter a valid weight');
      setMessageType('error');
      return;
    }
    
    const currentWeightGain = parseFloat(weeklyWeight) - parseFloat(startWeight);
    
    // Check if we're updating an existing week or adding a new one
    const existingEntryIndex = weightData.findIndex(item => item.Week === currentWeek);
    
    let updatedWeightData;
    if (existingEntryIndex >= 0) {
      // Update existing entry
      updatedWeightData = [...weightData];
      updatedWeightData[existingEntryIndex] = {
        ...updatedWeightData[existingEntryIndex],
        WeightGain: currentWeightGain
      };
    } else {
      // Add new entry
      updatedWeightData = [...weightData, {
        Week: currentWeek,
        WeightGain: currentWeightGain,
        ActualWeight: parseFloat(weeklyWeight)
      }];
      
      // Sort by week
      updatedWeightData.sort((a, b) => a.Week - b.Week);
    }
    
    setWeightData(updatedWeightData);
    analyzeWeightGain(updatedWeightData, bmiCategory);
    setWeeklyWeight('');
    
    // Auto-increment week if adding a new entry
    if (existingEntryIndex < 0) {
      setCurrentWeek(prev => Math.min(prev + 1, 40));
    }
  };

  // Analyze weight gain compared to reference data
  const analyzeWeightGain = (data, category) => {
    if (!data.length) return;
    
    const latestEntry = data[data.length - 1];
    const idealGainKey = `IdealGain_${category}(kg)`;
    const referenceGain = referenceData.find(item => item.Week === latestEntry.Week)?.[idealGainKey];
    
    if (referenceGain === undefined) return;
    
    const diff = latestEntry.WeightGain - referenceGain;
    const percentDiff = (diff / referenceGain) * 100;
    
    if (Math.abs(percentDiff) <= 10) {
      setMessage('🟢 Healthy progression! Your weight gain is within the recommended range.');
      setMessageType('success');
    } else if (diff < 0) {
      setMessage(`🔴 Weight gain is ${Math.abs(diff).toFixed(1)}kg lower than recommended for week ${latestEntry.Week}. Consider consulting your doctor.`);
      setMessageType('warning');
    } else {
      setMessage(`🔴 Weight gain is ${diff.toFixed(1)}kg higher than recommended for week ${latestEntry.Week}. Consider consulting your doctor.`);
      setMessageType('warning');
    }
  };

  // Create chart data by combining user data with reference data
  const getChartData = () => {
    const chartData = referenceData.map(refItem => {
      const userDataPoint = weightData.find(item => item.Week === refItem.Week);
      return {
        Week: refItem.Week,
        "Underweight": refItem["IdealGain_Underweight(kg)"],
        "Normal BMI": refItem["IdealGain_NormalBMI(kg)"],
        "Overweight": refItem["IdealGain_Overweight(kg)"],
        "Your Weight Gain": userDataPoint?.WeightGain || null
      };
    });
    
    return chartData;
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
        damping: 10,
        delayChildren: 0.3,
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

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-lg font-medium text-gray-900 mb-4"
        variants={itemVariants}
      >
        Pregnancy Weight Gain Tracker
      </motion.h3>
      
      <motion.div variants={itemVariants}>
        {!startWeightEntered ? (
          <form onSubmit={handleStartWeightSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="startWeight" className="block text-sm font-medium text-gray-700 mb-1">
                  Starting Weight (kg)
                </label>
                <input
                  type="number"
                  id="startWeight"
                  step="0.1"
                  min="30"
                  max="200"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Enter your pre-pregnancy weight"
                  value={startWeight}
                  onChange={(e) => setStartWeight(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="bmiCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  BMI Category
                </label>
                <select
                  id="bmiCategory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                  value={bmiCategory}
                  onChange={handleBMICategoryChange}
                >
                  <option value="Underweight">Underweight (BMI &lt; 18.5)</option>
                  <option value="NormalBMI">Normal BMI (18.5-24.9)</option>
                  <option value="Overweight">Overweight (BMI ≥ 25)</option>
                </select>
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="mt-4 w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Tracking
            </motion.button>
          </form>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleWeeklyWeightSubmit} className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="currentWeek" className="block text-sm font-medium text-gray-700 mb-1">
                    Pregnancy Week
                  </label>
                  <select
                    id="currentWeek"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    value={currentWeek}
                    onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
                      <option key={week} value={week}>Week {week}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="weeklyWeight" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weeklyWeight"
                    step="0.1"
                    min={parseFloat(startWeight)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Enter your current weight"
                    value={weeklyWeight}
                    onChange={(e) => setWeeklyWeight(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="mt-4 w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Record Weight
              </motion.button>
            </form>
            
            {message && (
              <motion.div
                className={`p-4 rounded-md ${
                  messageType === 'success' ? 'bg-green-50 text-green-800' :
                  messageType === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                  messageType === 'error' ? 'bg-red-50 text-red-800' :
                  'bg-blue-50 text-blue-800'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message}
              </motion.div>
            )}
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-4">Weight Gain Chart</h4>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="Week" 
                      label={{ value: 'Pregnancy Week', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      label={{ value: 'Weight Gain (kg)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip formatter={(value, name) => [value ? `${value.toFixed(2)} kg` : 'N/A', name]} />
                    <Legend verticalAlign="top" height={36} />
                    
                    <Line 
                      type="monotone" 
                      dataKey="Underweight" 
                      stroke="#94a3b8" 
                      strokeWidth={1} 
                      dot={false} 
                      strokeDasharray="5 5" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Normal BMI" 
                      stroke="#64748b" 
                      strokeWidth={1} 
                      dot={false} 
                      strokeDasharray="5 5" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Overweight" 
                      stroke="#334155" 
                      strokeWidth={1} 
                      dot={false} 
                      strokeDasharray="5 5" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Your Weight Gain" 
                      stroke="#f43f5e" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                      dot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Weight Entries</h4>
                {weightData.length > 0 ? (
                  <div className="overflow-auto max-h-40 border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight Gain (kg)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {weightData.map((entry) => (
                          <tr key={entry.Week}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Week {entry.Week}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.ActualWeight.toFixed(1)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.WeightGain.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No weight entries yet. Record your first weight above.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PregnancyWeightTracker;