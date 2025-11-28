import Campaign from '../models/campaign.model.js';

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ status: 'active' });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
    }
};

// Get a single campaign by ID
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaign', error: error.message });
    }
};

// Create a new campaign
export const createCampaign = async (req, res) => {
    try {
        const { title, description, goal, imageUrl, endDate } = req.body;
        const newCampaign = new Campaign({
            title,
            description,
            goal,
            imageUrl,
            endDate,
            createdBy: "60d21b4667d0d8992e610c85" // Placeholder user ID
        });
        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        res.status(500).json({ message: 'Error creating campaign', error: error.message });
    }
};