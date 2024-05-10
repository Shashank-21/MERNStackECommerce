import express from "express";

const router = express.Router();

import { requireSignIn, isAdmin } from "../middlewares/auth.js";

import {
  createCategory,
  listCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

router.post("/category", requireSignIn, isAdmin, createCategory);
router.get("/categories", listCategory);
router.get("/category/:slug", readCategory);
router.put("/category/:categoryId", requireSignIn, isAdmin, updateCategory);
router.delete("/category/:categoryId", requireSignIn, isAdmin, deleteCategory);

export default router;
