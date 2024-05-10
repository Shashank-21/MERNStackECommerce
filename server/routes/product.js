import express from "express";
import formidable from "express-formidable-v2";

const router = express.Router();

import { requireSignIn, isAdmin } from "../middlewares/auth.js";

import {
  createProduct,
  listProducts,
  readProduct,
  fetchPhoto,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";

router.post("/product", requireSignIn, isAdmin, formidable(), createProduct);
router.get("/products", listProducts);
router.get("/product/:slug", readProduct);
router.get("/product/photo/:productId", fetchPhoto);
router.delete("/product/:productId", requireSignIn, isAdmin, deleteProduct);
router.put(
  "/product/:productId",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

export default router;
