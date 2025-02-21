import express from 'express';
import { register,login,checkAuth ,logout} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', checkAuth); // New route

// router.get("/profile", protect, getProfile);
// router.post("/logout", logoutUser);

export default router;
