import express from "express";
import { getAllProducts, getProductById } from "../Controller/ProductController.js";

const router = express.Router();

// Route definitions
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
