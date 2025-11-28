import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to process a payment
router.post('/charge', processPayment);

export default router;