// src/utils/courseUtils.js

import WhyCyber from '../assets/whylearncyber.jpg';
import WhyDS from '../assets/whylearndatascince.jpeg';
import WhyDA from '../assets/whylearndataana.jpeg';
import WhyAI from '../assets/whyaiml.png';

import CyberVideo from '../assets/CS.mp4';
import DataScienceVideo from '../assets/DS.mp4';
import DataAnalyticsVideo from '../assets/DAta Analytics.mp4';
import AIMLVideo from '../assets/AI ML (1).mp4';

// Detail Images (Career / Gain)
import CareerCyber from '../assets/carrerincyber.jpeg';
import GainCyber from '../assets/gainincyber.jpeg';

import CareerDS from '../assets/carrerindatascience.jpeg';
import GainDS from '../assets/gainindatascience.jpeg';

import CareerDA from '../assets/carrerindataana.jpeg';
import GainDA from '../assets/gainindatascience.jpeg';

import CareerAI from '../assets/carrerinaiml.png';
import GainAI from '../assets/gainaiml.png';

// --- HELPERS ---

/**
 * Generates a URL-friendly slug from a course title.
 * This function is crucial for routing and must be consistent.
 * @param {object} c - The course object.
 * @returns {string} The generated slug.
 */
export const getSlug = (c) => {
  if (!c || !c.title) return '';

  const title = c.title.toLowerCase();

  // --- KEY FIX: Handle standard courses with explicit, predictable slugs ---
  // This ensures the URL in the browser matches what we look up.
  if (title.includes('cyber security')) {
    return 'cyber-security';
  }
  if (title.includes('data science')) {
    return 'data-science';
  }
  if (title.includes('data analytics')) {
    return 'data-analytics';
  }
  if (title.includes('ai & machine learning') || title.includes('ai/ml')) {
    return 'ai-ml-engineer';
  }

  // Handle special static courses
  if (title.includes('exam preparation kit')) {
    return 'exam-preparation-kit';
  }
  if (title.includes('career transition programs')) {
    return 'career-transition-programs';
  }
  if (title.includes('ai-powered learning paths')) {
    return 'ai-powered-learning-paths';
  }

  // Default slug generation for any other courses
  return title
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
    'ai-ml': WhyAI, // Fallback for slight variations
    'exam-preparation-kit': WhyCyber, // Using a placeholder
    'career-transition-programs': WhyCyber, // Using a placeholder
    'ai-powered-learning-paths': WhyAI, // Using a placeholder
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
    'ai-ml': AIMLVideo, // Fallback
    'exam-preparation-kit': CyberVideo, // Using a placeholder
    'career-transition-programs': CyberVideo, // Using a placeholder
    'ai-powered-learning-paths': AIMLVideo, // Using a placeholder
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
    'ai-ml': { career: CareerAI, gain: GainAI }, // Fallback
    'exam-preparation-kit': { career: CareerCyber, gain: GainCyber }, // Placeholder
    'career-transition-programs': { career: CareerCyber, gain: GainCyber }, // Placeholder
    'ai-powered-learning-paths': { career: CareerAI, gain: GainAI }, // Placeholder
  };
  return map[slug] || { career: CareerCyber, gain: GainCyber }; // Default fallback
};
