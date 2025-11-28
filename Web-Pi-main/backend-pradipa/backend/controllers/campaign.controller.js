import Campaign from '../models/campaign.model.js';

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        // Remove the status filter to fetch all campaigns
        const campaigns = await Campaign.find({}); 
        console.log('Campaigns fetched from DB:', campaigns); // Log data yang diambil
        res.status(200).json(campaigns);
    } catch (error) {
        console.error('Error in getAllCampaigns:', error); // Log error jika terjadi
        res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
    }
};

// Get a single campaign by ID
export const getCampaignById = async (req, res) => {
    try {
        // Menggunakan .populate() untuk mengambil detail 'createdBy'
        const campaign = await Campaign.findById(req.params.id).populate('createdBy', 'name');
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaign', error: error.message });
    }
};

// FUNGSI BARU UNTUK MENAMBAHKAN UPDATE
export const addCampaignUpdate = async (req, res) => {
    try {
        const { text } = req.body;
        // Validasi sederhana
        if (!text) {
            return res.status(400).json({ message: 'Update text is required' });
        }

        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        campaign.updates.push({ text });
        await campaign.save();
        
        // Mengirim kembali update terbaru untuk ditampilkan langsung di frontend
        res.status(201).json(campaign.updates[campaign.updates.length - 1]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding update', error: error.message });
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