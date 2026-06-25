import { Request, Response } from 'express';
import Note from './note.model.js';
import User from '../user/user.model.js';
import Subject from '../subjects/subject.model.js';
import Bookmark from './bookmark.model.js';
import { NotFoundError, ForbiddenError, BadRequestError } from '../../utils/errors.js';

export const getNotes = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const skip = (page - 1) * limit;
  const search = req.query.search as string;
  const isBookmarked = req.query.isBookmarked === 'true';
  const type = req.query.type as string; // 'ai_answer' | 'user_note' or similar, if applicable

  // Fetch the user's selected subjects
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  const selectedSubjects = user.learningPreferences?.selectedSubjects || [];

  // Build the query:
  // Must be either a platform note (isPrivate: false) matching the user's selected subjects,
  // OR the user's own private note (userId: userId, isPrivate: true).
  const queryConditions: any[] = [
    { userId, isPrivate: true }
  ];

  if (selectedSubjects.length > 0) {
    // Platform notes matching the user's selected subject IDs or names
    queryConditions.push({
      isPrivate: false,
      $or: [
        { subjectId: { $in: selectedSubjects } },
        { subjectName: { $in: selectedSubjects } }
      ]
    });
  } else {
    // If no subjects selected, match any platform notes
    queryConditions.push({ isPrivate: false });
  }

  const query: any = {
    $or: queryConditions
  };

  // Add bookmark filter if requested
  if (isBookmarked) {
    const userBookmarks = await Bookmark.find({ userId }).select('noteId');
    const bookmarkedNoteIds = userBookmarks.map((b) => b.noteId);
    query._id = { $in: bookmarkedNoteIds };
  }

  // Add text search if requested
  if (search) {
    query.$and = query.$and || [];
    query.$and.push({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { subjectName: { $regex: search, $options: 'i' } }
      ]
    });
  }

  const notes = await Note.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments(query);

  // Dynamically attach isBookmarked flag to each note
  const userBookmarks = await Bookmark.find({ userId }).select('noteId');
  const bookmarkedNoteIds = new Set(userBookmarks.map((b) => b.noteId.toString()));

  const notesWithBookmark = notes.map((note) => {
    const noteObj = note.toObject();
    noteObj.isBookmarked = bookmarkedNoteIds.has(note._id.toString());
    return noteObj;
  });

  res.status(200).json({
    notes: notesWithBookmark,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const getNoteById = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) throw new NotFoundError('Note not found');

  // Authorization check: if private, must belong to user
  if (note.isPrivate && note.userId?.toString() !== userId.toString()) {
    throw new ForbiddenError('You do not have permission to view this note');
  }

  const isBookmarked = await Bookmark.exists({ userId, noteId: note._id });
  const noteObj = note.toObject();
  noteObj.isBookmarked = !!isBookmarked;

  res.status(200).json(noteObj);
};

export const createNote = async (req: Request, res: Response) => {
  /* #swagger.requestBody = {
       required: true,
       content: {
         "multipart/form-data": {
           schema: {
             type: "object",
             properties: {
               title: { type: "string", example: "Integration by Parts Formula" },
               content: { type: "string", example: "∫u dv = uv - ∫v du. Use the LIATE rule..." },
               subjectId: { type: "string", example: "60d0fe4f5311236168a109cc" },
               subjectName: { type: "string", example: "Mathematics" },
               file: { type: "string", format: "binary" }
             },
             required: ["title"]
           }
         }
       }
     } */
  // @ts-ignore
  const userId = req.user.userId;
  const { title, content, subjectId, subjectName } = req.body;
  const fileUrl = req.file?.path; // Set by multer if a file was uploaded

  let resolvedSubjectName = subjectName;
  if (subjectId) {
    const subject = await Subject.findById(subjectId);
    if (subject) {
      resolvedSubjectName = subject.title;
    }
  }

  const note = await Note.create({
    userId,
    title,
    content,
    subjectId,
    subjectName: resolvedSubjectName,
    fileUrl,
    isPrivate: true, // Default user-created notes to private
    isBookmarked: false
  });

  res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  /* #swagger.requestBody = {
       required: true,
       content: {
         "multipart/form-data": {
           schema: {
             type: "object",
             properties: {
               title: { type: "string", example: "Integration by Parts Formula" },
               content: { type: "string", example: "∫u dv = uv - ∫v du. Use the LIATE rule..." },
               subjectId: { type: "string", example: "60d0fe4f5311236168a109cc" },
               subjectName: { type: "string", example: "Mathematics" },
               isBookmarked: { type: "boolean", example: true },
               file: { type: "string", format: "binary" }
             }
           }
         }
       }
     } */
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, content, subjectId, subjectName, isBookmarked } = req.body;
  const fileUrl = req.file?.path;

  const note = await Note.findById(id);
  if (!note) throw new NotFoundError('Note not found');

  // Check if this is ONLY a bookmark toggle update (bypassing ownership for platform notes)
  const activeKeys = Object.keys(req.body).filter(
    (key) => req.body[key] !== undefined && req.body[key] !== ''
  );
  const isOnlyBookmarking = activeKeys.every((key) => key === 'isBookmarked') && isBookmarked !== undefined;

  if (!isOnlyBookmarking && note.userId?.toString() !== userId.toString()) {
    throw new ForbiddenError('You can only modify your own notes');
  }

  // Handle bookmarking in the separate Bookmark collection
  if (isBookmarked !== undefined) {
    if (isBookmarked) {
      await Bookmark.findOneAndUpdate(
        { userId, noteId: note._id },
        { userId, noteId: note._id },
        { upsert: true, new: true }
      );
    } else {
      await Bookmark.findOneAndDelete({ userId, noteId: note._id });
    }
  }

  // Handle other note field updates (only allowed if owner)
  if (!isOnlyBookmarking) {
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (fileUrl !== undefined) note.fileUrl = fileUrl;

    if (subjectId !== undefined) {
      note.subjectId = subjectId;
      const subject = await Subject.findById(subjectId);
      if (subject) {
        note.subjectName = subject.title;
      }
    } else if (subjectName !== undefined) {
      note.subjectName = subjectName;
    }

    await note.save();
  }

  const noteObj = note.toObject();
  noteObj.isBookmarked = isBookmarked !== undefined ? isBookmarked : (await Bookmark.exists({ userId, noteId: note._id }) !== null);

  res.status(200).json(noteObj);
};

export const deleteNote = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) throw new NotFoundError('Note not found');

  // Check ownership
  if (note.userId?.toString() !== userId.toString()) {
    throw new ForbiddenError('You can only delete your own notes');
  }

  await Note.findByIdAndDelete(id);

  res.status(200).json({ message: 'Note deleted successfully' });
};

export const downloadNote = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) throw new NotFoundError('Note not found');

  // Check ownership if private
  if (note.isPrivate && note.userId?.toString() !== userId.toString()) {
    throw new ForbiddenError('You do not have permission to download this note');
  }

  const safeFilename = note.title.replace(/[^a-zA-Z0-9-_]/g, '_');

  if (note.fileUrl) {
    try {
      const response = await fetch(note.fileUrl);
      if (!response.ok) {
        throw new BadRequestError('Failed to fetch the document from storage provider');
      }

      const arrayBuffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const extension = note.fileUrl.split('.').pop() || 'pdf';

      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${safeFilename}.${extension}"`
      );

      res.send(Buffer.from(arrayBuffer));
    } catch (err) {
      throw new BadRequestError('Failed to fetch the document from storage provider');
    }
  } else {
    const content = note.content || '';
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${safeFilename}.md"`
    );
    res.send(content);
  }
};

export default {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  downloadNote,
};
