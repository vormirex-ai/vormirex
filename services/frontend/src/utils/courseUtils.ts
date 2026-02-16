// src/utils/courseUtils.js

// --- ASSET IMPORTS ---
// ... (keep all your imports the same)
import WhyCyber from '../assets/whylearncyber.jpg';
import WhyDS from '../assets/whylearndatascince.jpeg';
import WhyDA from '../assets/whylearndataana.jpeg';
import WhyAI from '../assets/whyaiml.png';

import CareerCyber from '../assets/carrerincyber.jpeg';
import GainCyber from '../assets/gainincyber.jpeg';

import CareerDS from '../assets/carrerindatascience.jpeg';
import GainDS from '../assets/gainindatascience.jpeg';

import CareerDA from '../assets/carrerindataana.jpeg';
import GainDA from '../assets/gainindatascience.jpeg';

import CareerAI from '../assets/carrerinaiml.png';
import GainAI from '../assets/gainaiml.png';

import examPrepHero from '../assets/exmprepkit.jpeg';
import careerTransitionHero from '../assets/carrertran.jpeg';
import aiLearningHero from '../assets/aipowered.jpeg';

import CyberSecurityPDF from '../assets/Cyber security weekly.pdf.pdf';
import DataSciencePDF from '../assets/Data analysis weekly.pdf.pdf';
import DataAnalyticsPDF from '../assets/Data analysis weekly.pdf.pdf';
import AIMLPDF from '../assets/AI _ ML_Course– Complete Syllabus.pdf';
import ExamPrepPDF from '../assets/Cyber security weekly.pdf.pdf';
import CareerTransitionPDF from '../assets/Data analysis weekly.pdf.pdf';
import AILearningPathsPDF from '../assets/AI _ ML_Course– Complete Syllabus.pdf';

// --- VIDEO ASSETS (CLOUDINARY) ---
const CyberVideo =
  'https://res.cloudinary.com/dsgbhkzpg/video/upload/v1770353841/Cyber_Security_Video_gkixm3.mp4';
const DataScienceVideo =
  'https://res.cloudinary.com/dsgbhkzpg/video/upload/v1770353870/Data_Science_V_2_tweph4.mp4';
const DataAnalyticsVideo =
  'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769844972/DA_zw9avx.mp4'; // This is the correct video
const AIMLVideo =
  'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769753171/Blue_Futuristic_Artificial_Intelligence_Video_1_ubonrm.mp4';

// ... (keep getSlug function the same)
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

// --- CORRECTED MAPPING FUNCTIONS ---

export const getCatalogImage = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'data-science': WhyDS,
    'data-analysis': WhyDA, // CORRECTED: Changed key to 'data-analysis'
    'cyber-security': WhyCyber,
    'ai-ml-engineer': WhyAI,
    'ai-ml': WhyAI,
    'exam-preparation-kit': examPrepHero,
    'career-transition-programs': careerTransitionHero,
    'ai-powered-learning-paths': aiLearningHero,
  };
  return (map as Record<string, string>)[slug] || c?.thumbnail || WhyCyber;
};

export const getHeroVideo = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': CyberVideo,
    'data-science': DataScienceVideo,
    'data-analysis': DataAnalyticsVideo, // CORRECTED: Changed key to 'data-analysis'
    'ai-ml-engineer': AIMLVideo,
    'ai-ml': AIMLVideo,
    'exam-preparation-kit': CyberVideo,
    'career-transition-programs': CyberVideo,
    'ai-powered-learning-paths': AIMLVideo,
  };
  return (map as Record<string, string>)[slug] || CyberVideo;
};

export const getDetailImages = (c: any) => {
  const slug = getSlug(c);
  const map = {
    'cyber-security': { career: CareerCyber, gain: GainCyber },
    'data-science': { career: CareerDS, gain: GainDS },
    'data-analysis': { career: CareerDA, gain: GainDA }, // CORRECTED: Changed key to 'data-analysis'
    'ai-ml-engineer': { career: CareerAI, gain: GainAI },
    'ai-ml': { career: CareerAI, gain: GainAI },
    'exam-preparation-kit': { career: CareerCyber, gain: GainCyber },
    'career-transition-programs': { career: CareerCyber, gain: GainCyber },
    'ai-powered-learning-paths': { career: CareerAI, gain: GainAI },
  };
  return (
    (map as Record<string, { career: string; gain: string }>)[slug] || {
      career: CareerCyber,
      gain: GainCyber,
    }
  );
};

export const getCoursePDF = (c: any) => {
  const slug = getSlug(c);
  const pdfMap = {
    'cyber-security': CyberSecurityPDF,
    'data-science': DataSciencePDF,
    'data-analysis': DataAnalyticsPDF, // CORRECTED: Changed key to 'data-analysis'
    'ai-ml-engineer': AIMLPDF,
    'ai-ml': AIMLPDF,
    'exam-preparation-kit': ExamPrepPDF,
    'career-transition-programs': CareerTransitionPDF,
    'ai-powered-learning-paths': AILearningPathsPDF,
  };

  return (pdfMap as Record<string, string>)[slug] || CyberSecurityPDF;
};
