import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

// Get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluded atributtes to not show in the response
    });
    return res.json({ data: products });
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by id
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    // validate if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json({ data: product });
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Create a new product and save it to the database
    const product = await Product.create(req.body);
    return res.status(201).json({ data: product });
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product's availability
export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
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
    return res.json({ data: "Deleted product" });
  } catch (error) {
    console.log(colors.bgRed(`Error: ${error}`));
    return res.status(500).json({ error: "Internal server error" });
  }
};
