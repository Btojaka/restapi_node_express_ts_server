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
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: 45 inch Curved Monitor
 *                  description:
 *                      type: string
 *                      description: The Product Description
 *                      example: This monitor is a new model, with lithium screen and maximum resolution.
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 250.59
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 *
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of All Products
 *          responses:
 *               200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                             type: array
 *                             items:
 *                                $ref: '#components/schemas/Product'
 */

// endpoint to get all products
router.get("/", (req, res) => {
  getProducts(req, res);
});

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product by its ID
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The Product ID
 *          responses:
 *               200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#components/schemas/Product'
 *               400:
 *                  description: Invalid ID supplied
 *               404:
 *                  description: Product not found
 */

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

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Create a new product with the provided details
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 45 inch Curved Monitor
 *                              description:
 *                                  type: string
 *                                  example: This monitor is a new model, with lithium screen and maximum resolution.
 *                              price:
 *                                  type: number
 *                                  example: 250.59
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *               201:
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#components/schemas/Product'
 *               400:
 *                  description: Invalid input
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update an existing product
 *          tags:
 *              - Products
 *          description: Update the details of an existing product by its ID
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The Product ID
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 45 inch Curved Monitor
 *                              description:
 *                                  type: string
 *                                  example: This monitor is a new model, with lithium screen and maximum resolution.
 *                              price:
 *                                  type: number
 *                                  example: 250.59
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *               200:
 *                  description: Product updated successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#components/schemas/Product'
 *               400:
 *                  description: Invalid input
 *               404:
 *                  description: Product not found
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Update the availability status of an existing product by its ID
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The Product ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              availability:
 *                                  type: boolean
 *                                  description: The Product Availability
 *                                  example: true
 *          responses:
 *               200:
 *                  description: Product availability updated successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#components/schemas/Product'
 *               400:
 *                  description: Invalid input
 *               404:
 *                  description: Product not found
 */

// endpoint to update a product partially (availability only)

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

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by ID
 *          tags:
 *              - Products
 *          description: Delete a product by its ID
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The Product ID
 *          responses:
 *               200:
 *                  description: Product deleted successfully
 *               400:
 *                  description: Invalid ID supplied
 *               404:
 *                  description: Product not found
 */

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
