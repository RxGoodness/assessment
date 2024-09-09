import { Router } from "express";
import { signup, login } from "../controllers/auth";
import { validateUser } from "../middlewares/validations/user";

const router = Router();

router.post("/signup", validateUser, signup);  
router.post("/login", validateUser, login);  

export default router;
