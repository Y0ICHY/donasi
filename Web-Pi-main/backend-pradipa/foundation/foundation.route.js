import express from 'express';
import { registerDonation } from './foundation.controller.js';

const router = express.Router();

router.post('/register', registerDonation);

export default router;