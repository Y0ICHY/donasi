import express from 'express';
import { getAllCampaigns, getCampaignById, createCampaign } from '../controllers/campaign.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Route to create a campaign
router.post('/', createCampaign);

export default router;