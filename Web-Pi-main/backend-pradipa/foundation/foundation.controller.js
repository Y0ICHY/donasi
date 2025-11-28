import Foundation from './foundation.model.js';

export const registerDonation = async (req, res) => {
  try {
    const { name, address, email, purpose, amount, phone } = req.body;
    const newFoundation = new Foundation({ name, address, email, purpose, amount, phone });
    await newFoundation.save();
    res.status(201).json({ message: 'Donation registered successfully', foundation: newFoundation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};