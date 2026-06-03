import { GoogleGenerativeAI } from '@google/generative-ai';
import AIChatModel from './aiChat.model.js';
import LessonModel from '../subjects/lesson.model.js';
import { NotFoundError } from '../../utils/errors.js';

class AITutorService {
  async getChatHistory(userId: string, lessonId: string) {
    let chat = await AIChatModel.findOne({ userId, lessonId }).exec();
    if (!chat) {
      chat = await AIChatModel.create({ userId, lessonId, messages: [] });
    }
    return chat;
  }

  async sendMessage(
    userId: string,
    lessonId: string,
    messageContent: string,
    actionType?: 'explain' | 'example' | 'exam' | 'summarize'
  ) {
    const lesson = await LessonModel.findById(lessonId).exec();
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    // 1. Format the transcript context
    const transcriptText = lesson.transcript
      .map((line) => `[${line.time}] ${line.text}`)
      .join('\n');

    // 2. Fetch or create chat record
    let chat = await AIChatModel.findOne({ userId, lessonId }).exec();
    if (!chat) {
      chat = new AIChatModel({ userId, lessonId, messages: [] });
    }

    // 3. Setup prompt based on actionType
    let finalUserPrompt = messageContent;
    if (actionType) {
      if (actionType === 'explain') {
        finalUserPrompt = `Explain the core concept in this part of the lesson transcript in simple, non-technical terms using analogies:\n\n${messageContent}`;
      } else if (actionType === 'example') {
        finalUserPrompt = `Provide a concrete, step-by-step example problem and solution demonstrating this concept from the lesson transcript:\n\n${messageContent}`;
      } else if (actionType === 'exam') {
        finalUserPrompt = `Formulate an exam question matching this topic, followed by the correct answer and a rubric indicating how marks are awarded:\n\n${messageContent}`;
      } else if (actionType === 'summarize') {
        finalUserPrompt = `Provide a bullet-pointed summary of this lesson context highlighting key takeaways:\n\n${messageContent}`;
      }
    }

    // Add user message input to history log
    chat.messages.push({
      role: 'user',
      content: finalUserPrompt,
      timestamp: new Date(),
    });

    // 4. Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY || 'MOCK_API_KEY';
    let assistantReply = '';

    if (apiKey === 'MOCK_API_KEY') {
      assistantReply = `[MOCK] This is a mock response from the AI Tutor regarding "${lesson.title}". Gemini API Key is not configured.`;
    } else {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: `You are the Vormirex AI Tutor Assistant, an advanced pedagogical tutor. Your goal is to guide students on the lesson topic using the provided transcript context. Keep answers concise, direct, educational, and formatting clean using Markdown. Do not reply to off-topic questions.\n\nLESSON TRANSCRIPT CONTEXT:\n${transcriptText}`,
        });

        // Format contents history (Gemini format: role 'user' | 'model', parts: [{ text }])
        const contents = chat.messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));

        const result = await model.generateContent({ contents });
        const response = await result.response;
        assistantReply = response.text() || 'I could not generate a response.';
      } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        assistantReply = `I'm sorry, I encountered an error communicating with my AI model. Please try again.`;
      }
    }

    // Add assistant response to history log
    chat.messages.push({
      role: 'model',
      content: assistantReply,
      timestamp: new Date(),
    });

    await chat.save();
    return chat;
  }
}

export default new AITutorService();
