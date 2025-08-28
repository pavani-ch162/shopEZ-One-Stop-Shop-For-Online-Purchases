import express from 'express';
import { fetchBanner, updateBanner } from '../controllers/adminController.js';

const router = express.Router();

router.get('/fetch-banner', fetchBanner);
router.post('/update-banner', updateBanner);

export default router;
