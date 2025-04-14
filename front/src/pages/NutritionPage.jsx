import React from 'react';
import NutritionSection from '../components/NutritionSection';
import BackButton from '../components/BackButton';

const NutritionPage = () => {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <NutritionSection />
      </div>
    </div>
  );
};

export default NutritionPage; 