import express from 'express';
// 1. AJOUTE 'searchUser' dans l'import 👇
import { createUser, getAllUsers, searchUser ,getUserReviews } from '../controllers/userController.js';

const router = express.Router();

// 2. AJOUTE la route de recherche ICI (avant les autres GET si possible) 👇
router.get('/search', searchUser);

router.post('/', createUser);
router.get('/', getAllUsers);

router.get('/:id/reviews', getUserReviews);

export default router;