import { Router } from 'express';
import noteController from './note.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { uploadGeneric } from '../../middleware/upload.middleware.js';
import { createNoteSchema, updateNoteSchema } from './note.validation.js';

const router = Router();

// Protect all note routes with authentication middleware
router.use(requireAuth);

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', validate(createNoteSchema), noteController.createNote);
router.patch('/:id', validate(updateNoteSchema), noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/upload', uploadGeneric.single('file'), noteController.uploadNoteFile);

export default router;
