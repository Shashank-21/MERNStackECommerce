import express from "express";
import { registerUser, loginUser, secret } from "../controllers/auth.js";
import { requireSignIn, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/users", userController);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth-check", requireSignIn, (request, response) => {
  response.json({ ok: true });
});
router.get("/secret", requireSignIn, isAdmin, secret);
export default router;
