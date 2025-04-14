import React from 'react';
import ExerciseVideos from '../components/ExerciseVideos';
import BackButton from '../components/BackButton';

const ExerciseVideosPage = () => {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <ExerciseVideos />
      </div>
    </div>
  );
};

export default ExerciseVideosPage; 