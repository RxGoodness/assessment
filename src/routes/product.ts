import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { validateProduct } from "../middlewares/validations/product";
import validateBody from "../utils/bodyValidator";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, validateProduct("add-product"), validateBody, createProduct);
router.put("/:id", authMiddleware,validateProduct("update-product"), validateBody, updateProduct);

export default router;
