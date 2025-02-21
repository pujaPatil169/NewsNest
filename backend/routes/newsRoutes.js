import express from 'express';
import { fetchNewsByCategory, fetchNewsBySource, getMediaContent } from '../controllers/newsController.js';
import { fetchAllRSSFeed } from '../controllers/eNewsController.js';
import authMiddleware from '../middlewares/auth.js'
const router = express.Router();

router.get('/category',authMiddleware, fetchNewsByCategory); // Updated to handle category-based fetching
router.get('/source',authMiddleware, fetchNewsBySource);
router.get('/E-News',authMiddleware,fetchAllRSSFeed);
// router.get('/E-News/:newspaperName',authMiddleware,fetchAllRSSFeed);
router.get('/media', authMiddleware, getMediaContent);
export default router;
