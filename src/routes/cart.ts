import { Router } from "express";
import { addToCart, listCart } from "../controllers/cart";
import { authMiddleware } from "../middlewares/auth";
import { validateCart } from "../middlewares/validations/cart";

const router = Router();

router.post("/", authMiddleware, validateCart, addToCart);  
router.get("/", authMiddleware, listCart);

export default router;
