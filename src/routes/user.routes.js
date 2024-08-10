import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import multer from "../middlewares/multer.middleware.js"; 
// Import the entire module

const router = Router();

router.post('/register', multer.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), registerUser);

export default router;

