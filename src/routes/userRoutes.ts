import express from "express";
import { createUser, loginUser, adminData } from "../controllers/userController";
import verifyToken from "../helpers/verify";
const router = express.Router();

router.post("/create", createUser);
router.post('/login', loginUser);
router.post('/admin',verifyToken, adminData);

export default router;
