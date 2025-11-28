import { z } from 'zod';
import Yayasan from '../models/yayasan.model.js';

// Validasi schema menggunakan Zod
const yayasanSchema = z.object({
  nama: z.string().min(3, 'Nama yayasan harus memiliki minimal 3 karakter'),
  alamat: z.string().optional(),
  telepon: z.string().regex(/^\d{10,15}$/, 'Telepon harus berupa angka dan antara 10-15 digit'),
});

// GET all yayasan
export const getAllYayasan = async (req, res) => {
  try {
    const yayasan = await Yayasan.find();
    res.json(yayasan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET yayasan by ID
export const getYayasanById = async (req, res) => {
    try {
      const yayasan = await Yayasan.findById(req.params.id);
      if (!yayasan) return res.status(404).json({ message: 'Yayasan not found' });
      res.json(yayasan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// POST create yayasan
export const createYayasan = async (req, res) => {
  try {
    // Validasi data dengan Zod
    const result = yayasanSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }

    const newYayasan = new Yayasan(result.data);
    await newYayasan.save();
    res.status(201).json(newYayasan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update yayasan
export const updateYayasan = async (req, res) => {
  try {
    // Validasi data dengan Zod
    const result = yayasanSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }

    const updated = await Yayasan.findByIdAndUpdate(req.params.id, result.data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Yayasan not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE yayasan
export const deleteYayasan = async (req, res) => {
  try {
    const deleted = await Yayasan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Yayasan not found' });
    res.json({ message: 'Yayasan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
