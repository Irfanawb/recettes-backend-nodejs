//permet d'associer chaque url a  la bonne fonction de controle
import express from 'express';
//AJOUT de 'searchUser
import { createUser, getAllUsers, searchUser ,getUserReviews ,exportUsersToJson} from '../controllers/userController.js';

const router = express.Router();

//AJOUT de la route de recherche
router.get('/search', searchUser);
router.get('/export', exportUsersToJson);

router.post('/', createUser);
router.get('/', getAllUsers);

router.get('/:id/reviews', getUserReviews);

export default router;