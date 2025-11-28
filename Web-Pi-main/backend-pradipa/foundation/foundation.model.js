import mongoose from 'mongoose';

const foundationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  phone: { type: String, required: true }
});

const Foundation = mongoose.model('Foundation', foundationSchema);
export default Foundation;