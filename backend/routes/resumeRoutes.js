import express from 'express';
import multer from 'multer';
// ✅ FIXED: Imported getResumeHistory here
import { analyzeResume, getResumeHistory } from '../controllers/resumeController.js'; 
import isAuth from '../middlewares/isAuth.js'; 

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// Route 1: Analyze Resume
router.post('/analyze', isAuth, upload.single('resume'), analyzeResume);

// Route 2: Get History
router.get('/history', isAuth, getResumeHistory);

export default router;