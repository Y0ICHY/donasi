import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goal: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'active' }, // e.g., active, completed, expired
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;