import Stripe from 'stripe';
import Campaign from '../models/campaign.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
    const { amount, source, description, campaignId } = req.body;

    try {
        // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount, // amount in cents
            currency: 'usd',
            source, // token from frontend
            description,
        });

        // If payment is successful, update the campaign's raised amount
        if (charge.paid) {
            const campaign = await Campaign.findById(campaignId);
            if (campaign) {
                campaign.raised += amount / 100; // Convert from cents to dollars
                await campaign.save();
            }
        }

        res.status(200).json({ success: true, charge });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};