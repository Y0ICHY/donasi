import express from 'express';
import { processPayment } from '../backend/controllers/payment.controller.js';

const router = express.Router();

// @route   POST /api/payment
// @desc    Process a payment through Stripe
// @access  Public
router.post('/', processPayment);

export default router;