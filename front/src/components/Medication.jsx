import React from 'react';
import { Pill } from 'lucide-react';

const medications = [
  {
    name: 'Prenatal Vitamins',
    description: 'Essential supplements for fetal development',
    timing: 'Daily with food',
    notes: 'Contains folic acid, iron, and other vital nutrients',
  },
  {
    name: 'Iron Supplements',
    description: 'Prevents anemia during pregnancy',
    timing: 'As prescribed',
    notes: 'Take with vitamin C for better absorption',
  },
  {
    name: 'Calcium Supplements',
    description: 'Supports bone development',
    timing: 'Twice daily',
    notes: 'Take separately from iron supplements',
  },
];

const Medication = () => {
  return (
    <div id="medication" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Medication Tracker
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Keep track of your pregnancy medications and supplements.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {medications.map((med) => (
              <div key={med.name} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Pill className="h-6 w-6 text-rose-500" />
                  <h3 className="ml-2 text-xl font-semibold text-gray-900">{med.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{med.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-500">Timing:</span>
                    <span className="ml-2 text-gray-600">{med.timing}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Notes:</span>
                    <p className="mt-1 text-gray-600">{med.notes}</p>
                  </div>
                </div>
                <button className="mt-6 w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">
                  Track Medication
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medication;