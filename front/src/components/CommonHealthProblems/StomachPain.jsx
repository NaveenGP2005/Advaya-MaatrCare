import React from 'react';
import { motion } from 'framer-motion';

const commonCauses = [
  {
    title: 'Ligament Pain',
    description: 'Often called "growing pains" as the ligaments stretch to support your growing bump',
    severity: 'mild'
  },
  {
    title: 'Constipation',
    description: 'Common in pregnancy and can cause discomfort',
    severity: 'mild'
  },
  {
    title: 'Trapped Wind',
    description: 'Can cause sharp, temporary pains',
    severity: 'mild'
  }
];

const warningSignsImmediate = [
  'Vaginal bleeding or spotting',
  'Regular cramping or tightenings',
  'Lower back pain',
  'Unusual vaginal discharge or fluid leakage',
  'Pain or burning when urinating',
  'Cloudy, pink, red, or brown urine',
  'Severe or persistent pain'
];

const seriousConditions = [
  {
    condition: 'Ectopic Pregnancy',
    symptoms: ['Tummy pain and bleeding', 'Shoulder tip pain', 'Discomfort when using toilet'],
    timeframe: '4-12 weeks of pregnancy'
  },
  {
    condition: 'Pre-eclampsia',
    symptoms: ['Pain under ribs (right side)', 'Severe headache', 'Vision problems', 'Swelling'],
    timeframe: 'After 20 weeks'
  },
  {
    condition: 'Placental Abruption',
    symptoms: ['Sudden pain', 'Bleeding', 'Contraction-like pain'],
    timeframe: 'Any stage'
  }
];

const StomachPain = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Stomach Pain in Pregnancy</h3>
        <p className="text-gray-600">
          Stomach (abdominal) pains or cramps are common in pregnancy. While they're usually harmless,
          it's important to know when they might indicate a more serious condition requiring medical attention.
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
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Common Causes</h4>
            <div className="space-y-4">
              {commonCauses.map((cause, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h5 className="font-medium text-gray-900">{cause.title}</h5>
                  <p className="text-gray-600 text-sm mt-1">{cause.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    cause.severity === 'mild' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cause.severity.charAt(0).toUpperCase() + cause.severity.slice(1)} Severity
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Warning Signs</h4>
            <div className="bg-rose-50 p-4 rounded-lg">
              <h5 className="font-medium text-rose-900 mb-2">Call Your Maternity Unit If You Have:</h5>
              <ul className="space-y-2">
                {warningSignsImmediate.map((sign, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                    className="flex items-center text-rose-800"
                  >
                    <span className="h-2 w-2 bg-rose-500 rounded-full mr-2" />
                    {sign}
                  </motion.li>
                ))}
              </ul>
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
          <h4 className="text-xl font-semibold text-gray-900 mb-6">Serious Conditions to Be Aware Of</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seriousConditions.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="bg-red-50 p-4 rounded-lg"
              >
                <h5 className="font-medium text-red-900 mb-2">{condition.condition}</h5>
                <p className="text-sm text-red-800 mb-2">Typically: {condition.timeframe}</p>
                <ul className="space-y-1">
                  {condition.symptoms.map((symptom, sIndex) => (
                    <li key={sIndex} className="text-sm text-red-800 flex items-center">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StomachPain;