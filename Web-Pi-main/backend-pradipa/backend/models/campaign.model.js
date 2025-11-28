import mongoose from 'mongoose';

// SKEMA BARU UNTUK UPDATE
const updateSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goal: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'active' }, // e.g., active, completed, expired
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updates: [updateSchema] // MENAMBAHKAN FIELD UPDATES
}, { 
    timestamps: true,
    collection: 'campaigns' // Secara eksplisit mengatur nama koleksi
});

// Untuk mencegah OverwriteModelError, periksa apakah model sudah dikompilasi
const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);

export default Campaign;