import { Request, Response } from 'express';
import Roadmap from './roadmap.model.js';
import User from '../user/user.model.js';

export const generateRoadmap = async (req: Request, res: Response) => {
  // @ts-ignore (Assuming you use standard JWT middleware)
  const userId = req.user.userId;
  const { educationLevel, selectedSubjects, primaryGoal } = req.body;

  if (!educationLevel || !selectedSubjects || !primaryGoal) {
    return res.status(400).json({ error: 'Missing required onboarding fields' });
  }

  // 1. Save preferences to the User document
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.learningPreferences = {
    ...user.learningPreferences,
    educationLevel,
    selectedSubjects,
    primaryGoal
  };
  await user.save();

  // 2. Mock AI Generation Delay (to simulate AI thinking time for the frontend loading screen)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 3. Generate Mock Roadmap Data based on their subjects
  const mockRoadmapData = {
    userId,
    status: 'active',
    summary: {
      durationWeeks: 8,
      totalSubjects: selectedSubjects.length,
      dailyGoalMinutes: 45,
      selectedSubjects: selectedSubjects
    },
    milestones: Array.from({ length: 8 }).map((_, i) => ({
      weekNumber: i + 1,
      title: `${selectedSubjects[0] || 'Learning'} Fundamentals - Week ${i + 1}`,
      description: `Master the core concepts required to achieve your goal of ${primaryGoal}.`,
      topicsCovered: ['Basics', 'Practice', 'Review'],
      isCompleted: false
    }))
  };

  // 4. Overwrite any existing roadmap for this user, or create a new one
  const roadmap = await Roadmap.findOneAndUpdate(
    { userId },
    mockRoadmapData,
    { new: true, upsert: true }
  );

  res.status(201).json({ 
    message: 'Roadmap generated successfully', 
    roadmap 
  });
};

export const getMyRoadmap = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const roadmap = await Roadmap.findOne({ userId });
  if (!roadmap) {
    return res.status(404).json({ error: 'No active roadmap found for this user' });
  }

  // Fallback for older roadmaps that do not have selectedSubjects in their summary
  if (!roadmap.summary.selectedSubjects || roadmap.summary.selectedSubjects.length === 0) {
    const user = await User.findById(userId);
    if (user && user.learningPreferences?.selectedSubjects?.length > 0) {
      const roadmapObj = roadmap.toObject();
      roadmapObj.summary = {
        ...roadmapObj.summary,
        selectedSubjects: user.learningPreferences.selectedSubjects
      };
      return res.status(200).json({ roadmap: roadmapObj });
    }
  }

  res.status(200).json({ roadmap });
};

export default { generateRoadmap, getMyRoadmap };
