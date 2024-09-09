import { body } from 'express-validator';

export const validateCart = [
  body('user').isUUID().withMessage('User ID must be a valid UUID'),
  body('product').isUUID().withMessage('Product ID must be a valid UUID'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
];
