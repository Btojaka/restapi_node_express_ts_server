import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";
const router = Router();

// Routing

// endpoint to get all products
router.get("/", (req, res) => {
  getProducts(req, res);
});

// endpoint to get a product by id
router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  // Call the middleware
  handleInputErrors,
  // Call the handler
  (req, res) => {
    getProductById(req, res);
  }
);

// endpoint to create a new product
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isNumeric()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0")
    .notEmpty()
    .withMessage("Price is required"),
  handleInputErrors,
  (req, res) => {
    createProduct(req, res);
  }
);

// endpoint to update a product

router.put(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isNumeric()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0")
    .notEmpty()
    .withMessage("Price is required"),
  body("availability").isBoolean().withMessage("Incorrect value"),
  // Call the middleware
  handleInputErrors,
  // Call the handler
  (req, res) => {
    updateProduct(req, res);
  }
);

// endpoint to update a product partially

router.patch(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  handleInputErrors,
  (req, res) => {
    updateAvailability(req, res);
  }
);

router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Incorrect value")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  handleInputErrors,
  (req, res) => {
    deleteProduct(req, res);
  }
);

export default router;
