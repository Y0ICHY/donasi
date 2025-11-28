import express from 'express';
import {
  getAllYayasan,
  getYayasanById,
  createYayasan,
  updateYayasan,
  deleteYayasan
} from '../controllers/yayasan.controller.js';

const router = express.Router();

router.get('/', getAllYayasan);
router.post('/', createYayasan);
router.get('/:id', getYayasanById);
router.patch('/:id', updateYayasan);
router.delete('/:id', deleteYayasan);

export default router;
