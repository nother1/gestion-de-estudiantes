import express from 'express';
import { loginConnecion } from '../controllers/loginController.js';

const router = express.Router();
router.post('/login', loginConnecion)
export default router;