import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from './user.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import upload from '../../middleware/upload.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, upload.single('photo'), updateUserProfile);

export default router;