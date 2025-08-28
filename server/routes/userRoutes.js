import express from 'express';
import { registerUser, loginUser, fetchUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/fetch-users', fetchUsers);

export default router;
