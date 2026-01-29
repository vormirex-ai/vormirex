// src/utils/courseUtils.js

import WhyCyber from '../assets/whylearncyber.jpg';
import WhyDS from '../assets/whylearndatascince.jpeg';
import WhyDA from '../assets/whylearndataana.jpeg';
import WhyAI from '../assets/whyaiml.png';

// New assets for the new courses
import WhyExam from '../assets/whylearncyber.jpg'; // Reusing cyber image as placeholder
import WhyCareer from '../assets/whylearncyber.jpg'; // Reusing cyber image as placeholder
import WhyAILearning from '../assets/whyaiml.png'; // Reusing AI image as placeholder

import CyberVideo from '../assets/CSFINAL.mp4';
import DataScienceVideo from '../assets/DSFINAL.mp4';
import DataAnalyticsVideo from '../assets/DAFINAL.mp4';
import AIMLVideo from '../assets/AI ML.mp4';

// New videos for the new courses
import ExamVideo from '../assets/CSFINAL.mp4'; // Reusing cyber video as placeholder
import CareerVideo from '../assets/CSFINAL.mp4'; // Reusing cyber video as placeholder
import AILearningVideo from '../assets/AI ML.mp4'; // Reusing AI video as placeholder

// Detail Images (Career / Gain)
import CareerCyber from '../assets/carrerincyber.jpeg';
import GainCyber from '../assets/gainincyber.jpeg';

import CareerDS from '../assets/carrerindatascience.jpeg';
import GainDS from '../assets/gainindatascience.jpeg';

import CareerDA from '../assets/carrerindataana.jpeg';
import GainDA from '../assets/gainindatascience.jpeg';

import CareerAI from '../assets/carrerinaiml.png';
import GainAI from '../assets/gainaiml.png';

// New detail images for the new courses
import CareerExam from '../assets/carrerincyber.jpeg'; // Reusing cyber image as placeholder
import GainExam from '../assets/gainincyber.jpeg'; // Reusing cyber image as placeholder

import CareerCareer from '../assets/carrerincyber.jpeg'; // Reusing cyber image as placeholder
import GainCareer from '../assets/gainincyber.jpeg'; // Reusing cyber image as placeholder

import CareerAILearning from '../assets/carrerinaiml.png'; // Reusing AI image as placeholder
import GainAILearning from '../assets/gainaiml.png'; // Reusing AI image as placeholder

// --- HELPERS ---

/**
 * Generates a URL-friendly slug from a course title.
 * This function MUST match the logic used in BuiltForEveryone.
 * @param {object} c - The course object.
 * @returns {string} The generated slug.
 */
export const getSlug = (c) => {
  if (!c || !c.title) return '';

  // Handle special cases first
  if (c.title.toLowerCase().includes('ai & machine learning')) {
    return 'ai-ml-engineer';
  }

  // Add this special case for Exam Preparation Kit
  if (c.title.toLowerCase().includes('exam preparation kit')) {
    return 'exam-preparation-kit';
  }

  // Add special case for Career Transition Programs
  if (c.title.toLowerCase().includes('career transition programs')) {
    return 'career-transition-programs';
  }

  // Add special case for AI-Powered Learning Paths
  if (c.title.toLowerCase().includes('ai-powered learning paths')) {
    return 'ai-powered-learning-paths';
  }

  return c.title
    .toLowerCase()
    .replace(/ \/ /g, '-') // Handles "Data Science / AI"
    .replace(/\//g, '-') // Handles other slashes
    .replace(/ & /g, '-') // Handles "AI & ML"
    .replace(/ /g, '-'); // Replaces spaces with hyphens
};

export const getCatalogImage = (c) => {
  const slug = getSlug(c);
  const map = {
    'data-science': WhyDS,
    'data-analytics': WhyDA,
    'cyber-security': WhyCyber,
    'ai-ml-engineer': WhyAI,
    'ai-ml': WhyAI,
    'exam-preparation-kit': WhyExam, // New mapping
    'career-transition-programs': WhyCareer, // New mapping
    'ai-powered-learning-paths': WhyAILearning, // New mapping
    'exam-preparation': WhyExam, // Alternative slug
    'career-programs': WhyCareer, // Alternative slug
    'ai-learning-paths': WhyAILearning, // Alternative slug
  };
  // Return mapped image or a default
  return map[slug] || c?.thumbnail || WhyCyber;
};

export const getHeroVideo = (c) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': CyberVideo,
    'data-science': DataScienceVideo,
    'data-analytics': DataAnalyticsVideo,
    'ai-ml-engineer': AIMLVideo,
    'ai-ml': AIMLVideo,
    'exam-preparation-kit': ExamVideo, // New mapping
    'career-transition-programs': CareerVideo, // New mapping
    'ai-powered-learning-paths': AILearningVideo, // New mapping
    'exam-preparation': ExamVideo, // Alternative slug
    'career-programs': CareerVideo, // Alternative slug
    'ai-learning-paths': AILearningVideo, // Alternative slug
  };
  return map[slug] || CyberVideo; // Default fallback
};

export const getDetailImages = (c) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': { career: CareerCyber, gain: GainCyber },
    'data-science': { career: CareerDS, gain: GainDS },
    'data-analytics': { career: CareerDA, gain: GainDA },
    'ai-ml-engineer': { career: CareerAI, gain: GainAI },
    'ai-ml': { career: CareerAI, gain: GainAI },
    'exam-preparation-kit': { career: CareerExam, gain: GainExam }, // New mapping
    'career-transition-programs': { career: CareerCareer, gain: GainCareer }, // New mapping
    'ai-powered-learning-paths': {
      career: CareerAILearning,
      gain: GainAILearning,
    }, // New mapping
    'exam-preparation': { career: CareerExam, gain: GainExam }, // Alternative slug
    'career-programs': { career: CareerCareer, gain: GainCareer }, // Alternative slug
    'ai-learning-paths': { career: CareerAILearning, gain: GainAILearning }, // Alternative slug
  };
  return map[slug] || { career: CareerCyber, gain: GainCyber }; // Default fallback
};
