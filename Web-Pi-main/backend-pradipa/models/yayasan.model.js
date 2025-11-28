import mongoose from 'mongoose';

const YayasanSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  alamat: { type: String },
  telepon: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Yayasan', YayasanSchema);
