import { Router } from "express";
import { Register } from "../Controllers/authController.js";

const router = Router()

router.post('/register',Register)

export default router