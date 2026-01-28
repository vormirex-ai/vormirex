/* ================= ASSET IMPORTS ================= */
// Catalog Images
import WhyCyber from '../assets/whylearncyber.jpg';
import WhyDS from '../assets/whylearndatascince.jpeg';
import WhyDA from '../assets/whylearndataana.jpeg';
import WhyAI from '../assets/whyaiml.png';

// Hero Videos
import CyberVideo from '../assets/CS.mp4'; // Default maps to Cyber usually, checking usage
import DataScienceVideo from '../assets/DS.mp4';
import DataAnalyticsVideo from '../assets/DA.mp4';
import AIMLVideo from '../assets/AI ML.mp4';

// Detail Images (Career / Gain)
import CareerCyber from '../assets/carrerincyber.jpeg';
import GainCyber from '../assets/gainincyber.jpeg';

import CareerDS from '../assets/carrerindatascience.jpeg';
import GainDS from '../assets/gainindatascience.jpeg';

import CareerDA from '../assets/carrerindataana.jpeg';
import GainDA from '../assets/gainindatascience.jpeg'; // Reusing as per original file

import CareerAI from '../assets/carrerinaiml.png';
import GainAI from '../assets/gainaiml.png';

// --- Helpers ---

export const getSlug = (c: any) => {
  if (!c || !c.title) return '';
  return c.title
    .toLowerCase()
    .replace(/ \/ /g, '-')
    .replace(/\//g, '-')
    .replace(/ /g, '-');
};

export const getCatalogImage = (c: any) => {
  const slug = getSlug(c);
  // Fallback map if needed, or based on logic
  const map: Record<string, string> = {
    'data-science': WhyDS,
    'data-analytics': WhyDA,
    'cyber-security': WhyCyber,
    'ai-ml-engineer': WhyAI,
    'ai-ml': WhyAI,
  };
  if (map[slug]) return map[slug];
  return c?.thumbnail || WhyCyber;
};

export const getHeroVideo = (c: any) => {
  const slug = getSlug(c);
  const map: Record<string, string> = {
    'cyber-security': CyberVideo, // Adjust if CyberVideo is distinct
    'data-science': DataScienceVideo,
    'data-analytics': DataAnalyticsVideo,
    'ai-ml-engineer': AIMLVideo,
    'ai-ml': AIMLVideo,
  };
  if (map[slug]) return map[slug];
  // Default fallback
  return CyberVideo;
};

export const getDetailImages = (c: any) => {
  const slug = getSlug(c);
  const map: Record<string, { career: string; gain: string }> = {
    'cyber-security': { career: CareerCyber, gain: GainCyber },
    'data-science': { career: CareerDS, gain: GainDS },
    'data-analytics': { career: CareerDA, gain: GainDA },
    'ai-ml-engineer': { career: CareerAI, gain: GainAI },
    'ai-ml': { career: CareerAI, gain: GainAI },
  };
  if (map[slug]) return map[slug];
  return { career: CareerCyber, gain: GainCyber };
};
