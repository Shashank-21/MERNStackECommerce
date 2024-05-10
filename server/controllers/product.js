import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const createProduct = async (request, response) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    //validation
    switch (true) {
      case !name.trim():
        return response.json({ error: "Name is required" });
      case !description:
        return response.json({ error: "Description is required" });
      case !price.trim():
        return response.json({ error: "Price is required" });
      case !category.trim():
        return response.json({ error: "Category is required" });
      case !quantity.trim():
        return response.json({ error: "Quantity is required" });
      case !shipping.trim():
        return response.json({ error: "Shipping is required" });
      case photo && photo.size > 1048576:
        return response.json({
          error: "Image should be less than 1 MB in size",
        });
    }

    //create product
    const product = new Product({ ...request.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.filepath);
      product.photo.contentType = photo.mimetype;
    }
    await product.save();
    response.json(product);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};

export const listProducts = async (request, response) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAT: -1 });

    response.json(products);
  } catch (error) {
    console.log(error.message);
    response.status(400).json(error);
  }
};
export const readProduct = async (request, response) => {
  try {
    const { slug } = request.params;
    const product = await Product.findOne({ slug })
      .populate("category")
      .select("-photo");

    response.json(product);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
export const fetchPhoto = async (request, response) => {
  try {
    const { productId } = request.params;
    const product = await Product.findById(productId).select("photo");
    if (product.photo.data) {
      response.set("Content-Type", product.photo.contentType);
      return response.send(product.photo.data);
    }
    //
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const { productId } = request.params;
    const product = await Product.findByIdAndDelete(productId).select("-photo");
    response.json(product);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};

export const updateProduct = async (request, response) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    //validation
    switch (true) {
      case !name.trim():
        return response.json({ error: "Name is required" });
      case !description:
        return response.json({ error: "Description is required" });
      case !price.trim():
        return response.json({ error: "Price is required" });
      case !category.trim():
        return response.json({ error: "Category is required" });
      case !quantity.trim():
        return response.json({ error: "Quantity is required" });
      case !shipping.trim():
        return response.json({ error: "Shipping is required" });
      case photo && photo.size > 1048576:
        return response.json({
          error: "Image should be less than 1 MB in size",
        });
    }

    //create product
    const { productId } = request.params;
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...request.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.filepath);
      product.photo.contentType = photo.mimetype;
    }
    await product.save();
    response.json(product);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
