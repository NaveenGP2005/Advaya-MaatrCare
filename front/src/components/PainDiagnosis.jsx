import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import img1 from '../Abdomen.jpg'
import PainLevel from './PainLevel';


const painData = [
  { Region: "Right Hypochondrium", Trimester: "First", "Mild Pain %": 30, "Moderate Pain %": 15, "Severe Pain %": 5 },
  { Region: "Right Hypochondrium", Trimester: "Second", "Mild Pain %": 25, "Moderate Pain %": 20, "Severe Pain %": 10 },
  { Region: "Right Hypochondrium", Trimester: "Third", "Mild Pain %": 20, "Moderate Pain %": 25, "Severe Pain %": 15 },
  { Region: "Epigastric Region", Trimester: "First", "Mild Pain %": 40, "Moderate Pain %": 20, "Severe Pain %": 10 },
  { Region: "Epigastric Region", Trimester: "Second", "Mild Pain %": 35, "Moderate Pain %": 25, "Severe Pain %": 15 },
  { Region: "Epigastric Region", Trimester: "Third", "Mild Pain %": 30, "Moderate Pain %": 30, "Severe Pain %": 20 },
  { Region: "Left Hypochondrium", Trimester: "First", "Mild Pain %": 25, "Moderate Pain %": 10, "Severe Pain %": 5 },
  { Region: "Left Hypochondrium", Trimester: "Second", "Mild Pain %": 20, "Moderate Pain %": 15, "Severe Pain %": 10 },
  { Region: "Left Hypochondrium", Trimester: "Third", "Mild Pain %": 15, "Moderate Pain %": 20, "Severe Pain %": 15 },
  { Region: "Right Lumbar", Trimester: "First", "Mild Pain %": 35, "Moderate Pain %": 20, "Severe Pain %": 10 },
  { Region: "Right Lumbar", Trimester: "Second", "Mild Pain %": 30, "Moderate Pain %": 25, "Severe Pain %": 15 },
  { Region: "Right Lumbar", Trimester: "Third", "Mild Pain %": 25, "Moderate Pain %": 30, "Severe Pain %": 20 },
  { Region: "Umbilical Region", Trimester: "First", "Mild Pain %": 50, "Moderate Pain %": 25, "Severe Pain %": 15 },
  { Region: "Umbilical Region", Trimester: "Second", "Mild Pain %": 45, "Moderate Pain %": 30, "Severe Pain %": 20 },
  { Region: "Umbilical Region", Trimester: "Third", "Mild Pain %": 40, "Moderate Pain %": 35, "Severe Pain %": 25 },
  { Region: "Left Lumbar", Trimester: "First", "Mild Pain %": 30, "Moderate Pain %": 15, "Severe Pain %": 10 },
  { Region: "Left Lumbar", Trimester: "Second", "Mild Pain %": 25, "Moderate Pain %": 20, "Severe Pain %": 15 },
  { Region: "Left Lumbar", Trimester: "Third", "Mild Pain %": 20, "Moderate Pain %": 25, "Severe Pain %": 20 },
  { Region: "Right Iliac Region", Trimester: "First", "Mild Pain %": 20, "Moderate Pain %": 10, "Severe Pain %": 5 },
  { Region: "Right Iliac Region", Trimester: "Second", "Mild Pain %": 25, "Moderate Pain %": 15, "Severe Pain %": 10 },
  { Region: "Right Iliac Region", Trimester: "Third", "Mild Pain %": 30, "Moderate Pain %": 20, "Severe Pain %": 15 },
  { Region: "Hypogastrium", Trimester: "First", "Mild Pain %": 45, "Moderate Pain %": 30, "Severe Pain %": 20 },
  { Region: "Hypogastrium", Trimester: "Second", "Mild Pain %": 50, "Moderate Pain %": 35, "Severe Pain %": 25 },
  { Region: "Hypogastrium", Trimester: "Third", "Mild Pain %": 55, "Moderate Pain %": 40, "Severe Pain %": 30 },
  { Region: "Left Iliac Region", Trimester: "First", "Mild Pain %": 20, "Moderate Pain %": 10, "Severe Pain %": 5 },
  { Region: "Left Iliac Region", Trimester: "Second", "Mild Pain %": 25, "Moderate Pain %": 15, "Severe Pain %": 10 },
  { Region: "Left Iliac Region", Trimester: "Third", "Mild Pain %": 30, "Moderate Pain %": 20, "Severe Pain %": 15 }
];

const abdominalRegions = [
  {
    name: 'Right Hypochondrium',
    description: 'Upper right region of the abdomen. Pain here could indicate liver-related issues or gallbladder problems during pregnancy.',
    position: 'col-start-1 row-start-1',
  },
  {
    name: 'Epigastric Region',
    description: 'Upper central region of the abdomen. Common area for heartburn and indigestion during pregnancy.',
    position: 'col-start-2 row-start-1',
  },
  {
    name: 'Left Hypochondrium',
    description: 'Upper left region of the abdomen. Could indicate spleen or stomach issues. May experience pressure as the uterus grows.',
    position: 'col-start-3 row-start-1',
  },
  {
    name: 'Right Lumbar',
    description: 'Middle right region. May indicate kidney issues or round ligament pain common in pregnancy.',
    position: 'col-start-1 row-start-2',
  },
  {
    name: 'Umbilical Region',
    description: 'Central region around the navel. Common for general pregnancy discomfort and stretching sensations.',
    position: 'col-start-2 row-start-2',
  },
  {
    name: 'Left Lumbar',
    description: 'Middle left region. Could indicate digestive issues or kidney problems during pregnancy.',
    position: 'col-start-3 row-start-2',
  },
  {
    name: 'Right Iliac Region',
    description: 'Lower right region. Important to monitor for appendicitis symptoms, which can be more difficult to diagnose during pregnancy.',
    position: 'col-start-1 row-start-3',
  },
  {
    name: 'Hypogastrium',
    description: 'Lower central region. Common area for bladder pressure and uterus-related pain during pregnancy.',
    position: 'col-start-2 row-start-3',
  },
  {
    name: 'Left Iliac Region',
    description: 'Lower left region. May indicate bowel discomfort or ligament pain during pregnancy.',
    position: 'col-start-3 row-start-3',
  },
];

const getStatisticalResponse = (region, trimester, severity) => {
  const regionData = painData.filter(data => 
    data.Region === region.name && 
    data.Trimester.toLowerCase() === trimester.toLowerCase()
  )[0];

  const severityPercentage = severity === 'Mild' 
    ? regionData['Mild Pain %']
    : severity === 'Moderate'
      ? regionData['Moderate Pain %']
      : regionData['Severe Pain %'];

  const commonness = severityPercentage > 30 
    ? 'very common'
    : severityPercentage > 20
      ? 'common'
      : severityPercentage > 10
        ? 'somewhat common'
        : 'less common';

  const urgency = severity === 'Severe' || severityPercentage < 10
    ? 'We recommend consulting with your healthcare provider to ensure there are no complications.'
    : 'This is generally considered normal during pregnancy, but monitor your symptoms and consult your healthcare provider if they worsen.';

  return `Based on our statistical data for the ${region.name} during the ${trimester} trimester:

${severity} pain in this region is ${commonness} during this stage of pregnancy, affecting approximately ${severityPercentage}% of pregnant individuals.

${region.description}

${urgency}

Remember to:
• Keep track of when the pain occurs and what makes it better or worse
• Stay hydrated and maintain good posture
• Use a pregnancy support belt if recommended by your healthcare provider
• Practice gentle stretching and exercises appropriate for your trimester
• Rest when needed and avoid overexertion`;
};

const PainDiagnosis = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [trimester, setTrimester] = useState('');
  const [severity, setSeverity] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (selectedRegion) {
      const regionData = painData.filter(data => data.Region === selectedRegion.name);
      
      const data = {
        labels: ['First Trimester', 'Second Trimester', 'Third Trimester'],
        datasets: [
          {
            label: 'Mild Pain',
            data: regionData.map(d => d['Mild Pain %']),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Moderate Pain',
            data: regionData.map(d => d['Moderate Pain %']),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Severe Pain',
            data: regionData.map(d => d['Severe Pain %']),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
          },
        ],
      };

      setChartData(data);
      // Short delay to allow animation to work properly
      setTimeout(() => setShowChart(true), 100);
    } else {
      setShowChart(false);
    }
  }, [selectedRegion]);

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedRegion ? `Pain Distribution in ${selectedRegion.name}` : '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage of Cases',
        },
      },
    },
  };

  const getAIDiagnosis = async () => {
    if (!selectedRegion || !trimester || !severity) return;

    setIsLoading(true);
    try {
      // Simulate API delay for loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = getStatisticalResponse(selectedRegion, trimester, severity);
      setAiResponse(response);
    } catch (error) {
      console.error('Error getting diagnosis:', error);
      setAiResponse('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity }
  };

  return (
    <div id="pain-diagnosis" className="py-24 bg-white">
      <PainLevel />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          className="text-center"
          variants={slideUp}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pain Diagnosis
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Click on the region where you feel pain and provide additional information for a data-driven diagnosis.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={slideUp}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src={img1}
                  alt="Abdominal Regions Diagram"
                  className="w-full h-auto rounded-lg mb-6"
                />
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {abdominalRegions.map((region) => (
                    <motion.button
                      key={region.name}
                      onClick={() => {
                        setSelectedRegion(region);
                        setAiResponse('');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${region.position} h-full w-full transition-colors duration-300 bg-opacity-20 hover:bg-rose-200 hover:bg-opacity-40 ${
                        selectedRegion?.name === region.name
                          ? 'bg-rose-500 bg-opacity-30'
                          : 'bg-transparent'
                      }`}
                    >
                      <span className="sr-only">{region.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {abdominalRegions.map((region, index) => (
                  <motion.button
                    key={region.name}
                    onClick={() => {
                      setSelectedRegion(region);
                      setAiResponse('');
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 text-sm rounded-lg transition-colors duration-300 ${
                      selectedRegion?.name === region.name
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-50 hover:bg-rose-100 text-gray-900'
                    }`}
                  >
                    {region.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {showChart && chartData && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-lg overflow-hidden"
                >
                  <Bar options={chartOptions} data={chartData} />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm text-gray-600"
                  >
                    This chart shows the distribution of pain severity across trimesters for the selected region.
                    Understanding these patterns can help differentiate between normal pregnancy discomfort and potential concerns.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            variants={slideUp}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg space-y-6"
          >
            {selectedRegion && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRegion.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-lg"
                    animate={selectedRegion ? { x: [10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{selectedRegion.name}</h3>
                    <p className="mt-2 text-gray-600">{selectedRegion.description}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Trimester</label>
                    <select
                      value={trimester}
                      onChange={(e) => {
                        setTrimester(e.target.value);
                        setAiResponse('');
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    >
                      <option value="">Select Trimester</option>
                      <option value="First">First Trimester</option>
                      <option value="Second">Second Trimester</option>
                      <option value="Third">Third Trimester</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Pain Severity</label>
                    <select
                      value={severity}
                      onChange={(e) => {
                        setSeverity(e.target.value);
                        setAiResponse('');
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    >
                      <option value="">Select Severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </motion.div>

                  <motion.button
                    onClick={getAIDiagnosis}
                    disabled={!selectedRegion || !trimester || !severity || isLoading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={isLoading ? pulse : {}}
                    className="w-full bg-rose-500 text-white px-4 py-3 rounded-md hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition duration-300 ease-in-out"
                  >
                    {isLoading ? 'Getting Diagnosis...' : 'Get Diagnosis'}
                  </motion.button>

                  <AnimatePresence>
                    {aiResponse && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 p-6 rounded-lg prose prose-rose overflow-hidden"
                      >
                        <motion.h4 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-lg font-medium text-gray-900 mb-4"
                        >
                          Diagnosis
                        </motion.h4>
                        <motion.div 
                          className="whitespace-pre-wrap text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {aiResponse}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            )}

            {!selectedRegion && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-64 flex items-center justify-center text-gray-500"
              >
                <motion.p
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  Select a region on the diagram to get started
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PainDiagnosis;