import { Request, Response } from "express";
import { Product } from "../entities/product";
import { connectDB } from "../config/database";
import { errorResponse, successResponse } from "../utils/responseHandler";

const productRepo = connectDB.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  try {

    const products = await productRepo.find();

    successResponse(res, 200, "success", products);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {

    const product = await productRepo.findOne({ where: { id: req.params.id } });
    if (!product) return errorResponse(res, 404, "Product not found");

    successResponse(res, 200, "success", product);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, image, size } = req.body;
  try {

    const product = productRepo.create({
      name,
      price,
      description,
      image,
      size,
    });
    await productRepo.save(product);
    
    successResponse(res, 200, "success", product);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {

    const product = await productRepo.findOne({ where: { id: req.params.id } });
    if (!product) return errorResponse(res, 404, "Product not found");

    productRepo.merge(product, req.body);
    const result = await productRepo.save(product);

    successResponse(res, 200, "success", result);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
