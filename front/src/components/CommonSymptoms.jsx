import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle, Info, Pill, Activity, Thermometer, Droplets, Moon, Sunrise, Layers, Heart } from 'lucide-react';

const symptoms = [
  {
    title: 'Constipation',
    description: 'Hormonal changes can cause constipation early in pregnancy.',
    remedies: [
      'Eat high-fiber foods (wholemeal breads, cereals, fruits, vegetables, pulses)',
      'Exercise regularly to maintain muscle tone',
      'Drink plenty of water',
      'Avoid iron supplements unless prescribed'
    ],
    icon: <Pill className="text-rose-500" size={24} />
  },
  {
    title: 'Cramps',
    description: 'Sudden, sharp pain, usually in calf muscles or feet, most common at night.',
    remedies: [
      'Perform regular gentle exercises',
      'Bend and stretch foot up and down 30 times',
      'Rotate foot 8 times each way',
      'Pull toes up towards ankle when cramp occurs',
      'Massage the affected muscle'
    ],
    icon: <Activity className="text-rose-500" size={24} />
  },
  {
    title: 'Feeling Faint',
    description: 'Common due to hormonal changes affecting blood flow to the brain.',
    remedies: [
      'Stand up slowly from sitting or lying down',
      'Sit down immediately if feeling faint while standing',
      'Lie on your side if feeling faint while lying down',
      'Avoid lying flat on your back after 28 weeks'
    ],
    icon: <Sunrise className="text-rose-500" size={24} />
  },
  {
    title: 'Feeling Hot',
    description: 'Increased warmth due to hormonal changes and increased blood supply to skin.',
    remedies: [
      'Wear loose, natural fiber clothing',
      'Keep room cool with electric fan',
      'Wash frequently to stay fresh',
      'Stay hydrated'
    ],
    icon: <Thermometer className="text-rose-500" size={24} />
  },
  {
    title: 'Incontinence',
    description: 'Common during pregnancy due to relaxed pelvic floor muscles.',
    remedies: [
      'Practice pelvic floor exercises',
      'Consult healthcare provider if concerned',
      'Empty bladder regularly',
      'Avoid lifting heavy objects'
    ],
    icon: <Droplets className="text-rose-500" size={24} />
  },
  {
    title: 'Frequent Urination',
    description: 'Common throughout pregnancy, especially in later stages.',
    remedies: [
      'Reduce evening fluid intake',
      'Stay hydrated during the day',
      'Rock back and forth while urinating in later pregnancy',
      'Seek medical attention if experiencing pain or blood in urine'
    ],
    icon: <Moon className="text-rose-500" size={24} />
  },
  {
    title: 'Skin Changes',
    description: 'Hormonal changes can cause darkening of nipples, skin patches, and development of linea nigra.',
    remedies: [
      'Use high-factor sunscreen',
      'Limit sun exposure',
      'Keep skin moisturized',
      'Remember changes usually fade post-pregnancy'
    ],
    icon: <Layers className="text-rose-500" size={24} />
  },
  {
    title: 'Varicose Veins',
    description: 'Swollen veins that can be uncomfortable but are generally harmless.',
    remedies: [
      'Avoid standing for long periods',
      'Don\'t sit with crossed legs',
      'Maintain healthy weight',
      'Elevate legs when sitting or sleeping',
      'Wear compression stockings',
      'Stay active with walking and swimming'
    ],
    icon: <Heart className="text-rose-500" size={24} />
  }
];

const CommonSymptoms = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0]);
  const [animating, setAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSymptomChange = (symptom) => {
    setAnimating(true);
    setSelectedSymptom(symptom);
    setIsMenuOpen(false);
    
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };

  return (
    <div id="common-symptoms" className="py-8 md:py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Pregnancy Journey</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Managing Common Pregnancy Symptoms
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
            Understanding and finding relief for everyday discomforts during pregnancy.
          </p>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="bg-rose-100 text-rose-500 p-2 rounded-full mr-2">
                    <Info size={16} />
                  </span>
                  Common Symptoms
                </span>
                <button 
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? 'Close' : 'Open'}
                </button>
              </h3>
              <div className={`space-y-2 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.title}
                    onClick={() => handleSymptomChange(symptom)}
                    className={`w-full flex items-center text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedSymptom.title === symptom.title
                        ? 'bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gradient-to-r hover:from-rose-100 hover:to-rose-200 text-gray-900'
                    }`}
                  >
                    <span className="icon-container mr-3 transition-transform duration-300">
                      {symptom.icon}
                    </span>
                    <span>{symptom.title}</span>
                    {selectedSymptom.title === symptom.title && (
                      <ArrowRight className="ml-auto" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className={`bg-white rounded-xl shadow-md p-4 md:p-6 transition-all duration-300 ${animating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
              <div className="flex items-center mb-4 md:mb-6">
                <span className="text-3xl mr-4 transition-transform duration-300 hover:scale-110">
                  {selectedSymptom.icon}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {selectedSymptom.title}
                  </h3>
                  <p className="text-rose-500 text-sm md:text-base">Common during pregnancy</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6 hover:bg-gray-100 transition-colors duration-300">
                <p className="text-gray-700 text-sm md:text-base">
                  {selectedSymptom.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle size={20} className="text-rose-500 mr-2" />
                  Recommended Remedies:
                </h4>
                <ul className="space-y-2 md:space-y-3 pl-2">
                  {selectedSymptom.remedies.map((remedy, index) => (
                    <li 
                      key={index} 
                      className="flex items-start p-2 md:p-3 rounded-lg transition-all duration-300 bg-rose-50 hover:bg-rose-100"
                    >
                      <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full bg-rose-100 text-rose-500 mr-2 md:mr-3">
                        <Check size={12} />
                      </span>
                      <span className="text-gray-700 text-sm md:text-base">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 md:mt-8 border-t border-gray-200 pt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-md bg-rose-100 text-rose-500 transition-all duration-300 hover:bg-rose-200 hover:rotate-12">
                      <Info size={20} />
                    </span>
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-500">
                      Always consult with your healthcare provider about any concerns during pregnancy.
                      This information is for general guidance only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonSymptoms;
