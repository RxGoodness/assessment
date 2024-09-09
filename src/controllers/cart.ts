import { Request, Response } from "express";
import { Product } from "../entities/product";
import { Cart } from "../entities/cart";
import { connectDB } from "../config/database";
import { errorResponse, successResponse } from "../utils/responseHandler";

const productRepo = connectDB.getRepository(Product);
const cartRepo = connectDB.getRepository(Cart);

export const addToCart = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).user.userId;
    const { productId, quantity = 1 } = req.body;
       
    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) return errorResponse(res, 404, "Product not found");

    let cartItem = await cartRepo.findOne({
        where: { user: { id: userId }, product: {id: productId} },
        relations: ["product"],
      });
    if(!cartItem){
     cartItem = cartRepo.create({ user: userId, product, quantity });
    } else {
        cartItem.quantity += quantity;
    }
    await cartRepo.save(cartItem);

    successResponse(res, 200, "success", "Added to cart");
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const listCart = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).user.userId;

    const cartItems = await cartRepo.find({
      where: { user: { id: userId } },
      relations: ["product"],
    });

    successResponse(res, 200, "success", cartItems);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
