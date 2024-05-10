import Category from "../models/categories.js";
import slugify from "slugify";

export const createCategory = async (request, response) => {
  try {
    const { name } = request.body;
    if (!name.trim()) {
      return response.json({ error: "Name required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return response.json({
        error: `Category by name ${name} already exists!`,
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    response.json(category);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
export const listCategory = async (request, response) => {
  try {
    const all = await Category.find({});
    response.json(all);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
export const readCategory = async (request, response) => {
  try {
    const category = await Category.findOne({ slug: request.params.slug });
    response.json(category);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
export const updateCategory = async (request, response) => {
  try {
    const { name } = request.body;
    const { categoryId } = request.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    response.json(category);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
export const deleteCategory = async (request, response) => {
  try {
    const { categoryId } = request.params;
    const removed = await Category.findByIdAndDelete(categoryId);
    response.json(removed);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
};
