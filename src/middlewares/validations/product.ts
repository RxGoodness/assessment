import { body, param } from "express-validator";

export const validateProduct = (action?: string) => {
  switch (action) {
    case "add-product":
      return [
        body("name").isString().withMessage("Name must be a string"),
        body("size")
          .isFloat({ gt: 0 })
          .withMessage("Size must be a positive number"),
        body("image").isString().withMessage("Image URL must be a string"),
        body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be a positive number"),
        body("description")
          .optional()
          .isString()
          .withMessage("Description must be a string if provided"),
        body("discount")
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage("Discount must be a percentage between 0 and 100"),
      ];
    case "update-product":
      return [
        body("name").isString().optional().withMessage("Name must be a string"),
        body("size")
          .isFloat({ gt: 0 })
          .optional()
          .withMessage("Size must be a positive number"),
        body("image")
          .isString()
          .optional()
          .withMessage("Image URL must be a string"),
        body("price")
          .isFloat({ gt: 0 })
          .optional()
          .withMessage("Price must be a positive number"),
        body("description")
          .optional()
          .isString()
          .withMessage("Description must be a string if provided"),
        body("discount")
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage("Discount must be a percentage between 0 and 100"),
      ];
  default:
      return [];
  }
};
