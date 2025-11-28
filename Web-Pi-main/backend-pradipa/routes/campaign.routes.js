import express from 'express';
// FUNGSI addCampaignUpdate SEKARANG DIIMPOR
import { getAllCampaigns, getCampaignById, createCampaign, addCampaignUpdate } from '../backend/controllers/campaign.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Rute untuk menambahkan update
router.post('/:id/updates', addCampaignUpdate);

// Route to create a campaign
router.post('/', createCampaign);

export default router;