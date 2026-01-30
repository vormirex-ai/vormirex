// src/utils/courseUtils.js

// --- ASSET IMPORTS ---
// Catalog Images
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
const CyberVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769757258/C_S_yyglnw.mp4';
const DataScienceVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769761429/DS_1_ba7nlt.mp4';
const DataAnalyticsVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769761051/DA_bhkotm.mp4';
const AIMLVideo = 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769753171/Blue_Futuristic_Artificial_Intelligence_Video_1_ubonrm.mp4';

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
    'exam-preparation-kit': WhyCyber, // Fallback
    'career-programs': WhyCyber, // Fallback
    'ai-learning-paths': WhyAI, // Fallback
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
    'exam-preparation-kit': CyberVideo, // Fallback
    'career-programs': CyberVideo, // Fallback
    'ai-learning-paths': AIMLVideo, // Fallback
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
    'exam-preparation-kit': { career: CareerCyber, gain: GainCyber }, // Fallback
    'career-programs': { career: CareerCyber, gain: GainCyber }, // Fallback
    'ai-learning-paths': { career: CareerAI, gain: GainAI }, // Fallback
  };
  return (map as Record<string, { career: string; gain: string }>)[slug] || { career: CareerCyber, gain: GainCyber }; // Default fallback
};
