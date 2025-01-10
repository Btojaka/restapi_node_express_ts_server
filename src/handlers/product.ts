import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

// Get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // remove try catch structures because errors are handled in the tests
  const products = await Product.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluded atributtes to not show in the response
  });
  return res.json({ data: products });
};

// Get a product by id
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  // validate if the product exists
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json({ data: product });
};

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Create a new product and save it to the database
  const product = await Product.create(req.body);
  return res.status(201).json({ data: product });
};

// Update a product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  // validate if the product exists
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Update the product
  await product.update(req.body);
  await product.save();
  return res.json({ data: product });
};

// Update a product's availability
export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  // validate if the product exists
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Update availability
  product.availability = !product.dataValues.availability; // Toggle the availability
  await product.save();
  return res.json({ data: product });
};

// Delete a product

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  // validate if the product exists
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  // Delete the product
  await product.destroy();
  return res.json({ data: "Product deleted" });
};
