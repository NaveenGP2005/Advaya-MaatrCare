import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Stethoscope,
  Heart,
  Utensils,
  Pill,
  Calendar,
  Clock,
  FolderOpen,
  AlertTriangle, // ✅ only once
  Activity       // ✅ add this for the exercise icon
} from 'lucide-react';

const features = [
  {
    name: 'Pain Diagnosis',
    description: 'Get accurate diagnosis for your pain symptoms with our AI-powered system.',
    icon: Stethoscope,
    link: '/pain-diagnosis'
  },
  {
    name: 'Exercise Guide',
    description: 'Access curated exercise videos for each trimester of your pregnancy.',
    icon: Activity,
    link: '/exercise-videos'
  },
  {
    name: 'Nutrition Guide',
    description: 'Get personalized nutrition advice and meal plans for a healthy pregnancy.',
    icon: Utensils,
    link: '/nutrition'
  },
  {
    name: 'Common Symptoms',
    description: 'Learn about common pregnancy symptoms and how to manage them.',
    icon: AlertTriangle,

    link: '/symptoms'
  },
  {
    name: 'Health Problems',
    description: 'Information about common health problems during pregnancy and their solutions.',
    icon: Heart,
    link: '/health-problems'
  },
  {
    name: 'Medication Tracker',
    description: 'Track your medications and get reminders for your doses.',
    icon: Clock,
    link: '/medication-tracker'
  },
  {
    name: 'Appointment Booking',
    description: 'Book and manage your doctor appointments easily.',
    icon: Calendar,
    link: '/appointments'
  },
  {
    name: 'Anomaly Report',
    description: 'Get AI-powered analysis of your medical reports and scans.',
    icon: Pill,
    link: '/anomaly-report'
  },
  {
    name: 'Records',
    description: 'Upload and manage your medical records securely.',
    icon: FolderOpen,
    link: '/records'
  }
];

const Features = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-rose-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our complete care solutions tailored for a healthy pregnancy journey.
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feature.link}
                  className="group relative block p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-200 hover:bg-rose-50"
                >
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center justify-center p-3 rounded-full bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 group-hover:text-gray-700">
                    {feature.description}
                  </p>
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="mt-4 text-sm font-medium text-rose-500 flex items-center group-hover:underline"
                  >
                    Learn more →
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
