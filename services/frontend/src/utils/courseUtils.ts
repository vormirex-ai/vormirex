// src/utils/courseUtils.js

import WhyCyber from '../assets/whylearncyber.jpg';
import WhyDS from '../assets/whylearndatascince.jpeg';
import WhyDA from '../assets/whylearndataana.jpeg';
import WhyAI from '../assets/whyaiml.png';



// Detail Images (Career / Gain)
import CareerCyber from '../assets/carrerincyber.jpeg';
import GainCyber from '../assets/gainincyber.jpeg';

import CareerDS from '../assets/carrerindatascience.jpeg';
import GainDS from '../assets/gainindatascience.jpeg';

import CareerDA from '../assets/carrerindataana.jpeg';
import GainDA from '../assets/gainindatascience.jpeg';

import CareerAI from '../assets/carrerinaiml.png';
import GainAI from '../assets/gainaiml.png';

// --- VIDEO ASSETS (CLOUDINARY) ---
const CyberVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769714997/CSFINAL_xefanb.mp4';
const DataScienceVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769714996/DSFINAL_eea6rz.mp4';
const DataAnalyticsVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769714988/DAFINAL_awen2j.mp4';
const AIMLVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769714977/AI_ML_jw4zyp.mp4';

// --- HELPERS ---

/**
 * Generates a URL-friendly slug from a course title.
 * This function MUST match the logic used in BuiltForEveryone.
 * @param {object} c - The course object.
 * @returns {string} The generated slug.
 */
export const getSlug = (c: any) => {
  if (!c || !c.title) return '';

  // Handle special cases first
  if (c.title.toLowerCase().includes('ai & machine learning')) {
    return 'ai-ml-engineer';
  }

  if (c.title.toLowerCase().includes('exam preparation kit')) {
    return 'exam-preparation-kit';
  }

  if (c.title.toLowerCase().includes('career transition programs')) {
    return 'career-transition-programs';
  }

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

export const getCatalogImage = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'data-science': WhyDS,
    'data-analytics': WhyDA,
    'cyber-security': WhyCyber,
    'ai-ml-engineer': WhyAI,
    'ai-ml': WhyAI,
    'exam-preparation-kit': WhyCyber,
    'career-transition-programs': WhyCyber,
    'ai-powered-learning-paths': WhyAI,
  };
  // Return mapped image or a default
  return (map as Record<string, string>)[slug] || c?.thumbnail || WhyCyber;
};

export const getHeroVideo = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': CyberVideo,
    'data-science': DataScienceVideo,
    'data-analytics': DataAnalyticsVideo,
    'ai-ml-engineer': AIMLVideo,
    'ai-ml': AIMLVideo,
    'exam-preparation-kit': CyberVideo,
    'career-transition-programs': CyberVideo,
    'ai-powered-learning-paths': AIMLVideo,
  };
  return (map as Record<string, string>)[slug] || CyberVideo; // Default fallback
};

export const getDetailImages = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': { career: CareerCyber, gain: GainCyber },
    'data-science': { career: CareerDS, gain: GainDS },
    'data-analytics': { career: CareerDA, gain: GainDA },
    'ai-ml-engineer': { career: CareerAI, gain: GainAI },
    'ai-ml': { career: CareerAI, gain: GainAI },
    'exam-preparation-kit': { career: CareerCyber, gain: GainCyber },
    'career-transition-programs': { career: CareerCyber, gain: GainCyber },
    'ai-powered-learning-paths': { career: CareerAI, gain: GainAI },
  };
  return (map as Record<string, { career: string; gain: string }>)[slug] || { career: CareerCyber, gain: GainCyber }; // Default fallback
};
