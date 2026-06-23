import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import noteController from './note.controller.js';
import Note from './note.model.js';
import User from '../user/user.model.js';
import Subject from '../subjects/subject.model.js';
import { ForbiddenError, NotFoundError } from '../../utils/errors.js';

describe('Notes Controller Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  const otherUserId = '60d0fe4f5311236168a109cb';
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockReq = {
      user: { userId: mockUserId },
      query: {},
      params: {},
      body: {},
      file: undefined,
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('getNotes', () => {
    it('should return a user\'s own private notes and platform notes matching selected subjects', async () => {
      const mockUser = {
        _id: mockUserId,
        learningPreferences: {
          selectedSubjects: ['60d0fe4f5311236168a109cc', 'Physics'],
        },
      };

      const mockNotes = [
        { title: 'My Private Chemistry Note', isPrivate: true, userId: mockUserId },
        { title: 'Platform Physics Guide', isPrivate: false, subjectName: 'Physics' },
      ];

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      (jest.spyOn(Note, 'find') as any).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn(() => Promise.resolve(mockNotes as any)),
          }),
        }),
      });
      jest.spyOn(Note, 'countDocuments').mockResolvedValue(2);

      await noteController.getNotes(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          notes: mockNotes,
          total: 2,
          page: 1,
          pages: 1,
        })
      );
    });

    it('should filter by bookmark and search term if provided', async () => {
      const mockUser = {
        _id: mockUserId,
        learningPreferences: { selectedSubjects: [] },
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      const findSpy = (jest.spyOn(Note, 'find') as any).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn(() => Promise.resolve([])),
          }),
        }),
      });
      jest.spyOn(Note, 'countDocuments').mockResolvedValue(0);

      mockReq.query = { search: 'organic', isBookmarked: 'true' };

      await noteController.getNotes(mockReq, mockRes);

      expect(findSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          isBookmarked: true,
          $and: expect.arrayContaining([
            expect.objectContaining({
              $or: [
                { title: { $regex: 'organic', $options: 'i' } },
                { content: { $regex: 'organic', $options: 'i' } },
                { subjectName: { $regex: 'organic', $options: 'i' } },
              ],
            }),
          ]),
        })
      );
    });
  });

  describe('getNoteById', () => {
    it('should successfully return the note if owned by user', async () => {
      const mockNote = {
        _id: 'note1',
        title: 'Secret Note',
        isPrivate: true,
        userId: mockUserId,
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);
      mockReq.params.id = 'note1';

      await noteController.getNoteById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockNote);
    });

    it('should throw ForbiddenError if user requests someone else\'s private note', async () => {
      const mockNote = {
        _id: 'note1',
        title: 'Someone else\'s secret',
        isPrivate: true,
        userId: otherUserId,
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);
      mockReq.params.id = 'note1';

      await expect(noteController.getNoteById(mockReq, mockRes)).rejects.toThrow(ForbiddenError);
    });
  });

  describe('createNote', () => {
    it('should successfully create a new user note and resolve subjectName', async () => {
      const mockNote = {
        title: 'New Note',
        content: 'Note Content',
        userId: mockUserId,
        subjectId: '60d0fe4f5311236168a109cc',
        subjectName: 'Mathematics',
        fileUrl: 'https://cloudinary.com/file.pdf',
        isPrivate: true,
      };

      const mockSubject = {
        _id: '60d0fe4f5311236168a109cc',
        title: 'Mathematics',
      };

      jest.spyOn(Subject, 'findById').mockResolvedValue(mockSubject as any);
      jest.spyOn(Note, 'create').mockResolvedValue(mockNote as any);

      mockReq.body = {
        title: 'New Note',
        content: 'Note Content',
        subjectId: '60d0fe4f5311236168a109cc',
      };
      mockReq.file = { path: 'https://cloudinary.com/file.pdf' };

      await noteController.createNote(mockReq, mockRes);

      expect(Subject.findById).toHaveBeenCalledWith('60d0fe4f5311236168a109cc');
      expect(Note.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUserId,
          title: 'New Note',
          subjectName: 'Mathematics',
          fileUrl: 'https://cloudinary.com/file.pdf',
        })
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNote);
    });
  });

  describe('updateNote', () => {
    it('should update note and resolve subjectName if subjectId is provided', async () => {
      const mockNote = {
        _id: 'note1',
        title: 'Old Title',
        userId: mockUserId,
        save: jest.fn(() => Promise.resolve(true as any)),
      };

      const mockSubject = {
        _id: '60d0fe4f5311236168a109cd',
        title: 'Physics',
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);
      jest.spyOn(Subject, 'findById').mockResolvedValue(mockSubject as any);

      mockReq.params.id = 'note1';
      mockReq.body = { title: 'New Title', subjectId: '60d0fe4f5311236168a109cd' };
      mockReq.file = { path: 'https://cloudinary.com/newfile.pdf' };

      await noteController.updateNote(mockReq, mockRes);

      expect(mockNote.title).toBe('New Title');
      expect((mockNote as any).subjectId).toBe('60d0fe4f5311236168a109cd');
      expect((mockNote as any).subjectName).toBe('Physics');
      expect((mockNote as any).fileUrl).toBe('https://cloudinary.com/newfile.pdf');
      expect(mockNote.save).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should throw ForbiddenError if user attempts to update a note they do not own', async () => {
      const mockNote = {
        _id: 'note1',
        title: 'Platform Note',
        userId: otherUserId,
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);
      mockReq.params.id = 'note1';
      mockReq.body = { title: 'New Title' };

      await expect(noteController.updateNote(mockReq, mockRes)).rejects.toThrow(ForbiddenError);
    });
  });

  describe('deleteNote', () => {
    it('should successfully delete owned note', async () => {
      const mockNote = {
        _id: 'note1',
        userId: mockUserId,
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);
      jest.spyOn(Note, 'findByIdAndDelete').mockResolvedValue(mockNote as any);
      mockReq.params.id = 'note1';

      await noteController.deleteNote(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Note deleted successfully' }));
    });

    it('should throw ForbiddenError when deleting notes owned by other users', async () => {
      const mockNote = {
        _id: 'note1',
        userId: otherUserId,
      };

      jest.spyOn(Note, 'findById').mockResolvedValue(mockNote as any);

      mockReq.params.id = 'note1';

      await expect(noteController.deleteNote(mockReq, mockRes)).rejects.toThrow(ForbiddenError);
    });
  });
});
