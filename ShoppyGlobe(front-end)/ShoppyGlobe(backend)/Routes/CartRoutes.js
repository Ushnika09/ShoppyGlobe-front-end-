// routes/cartRoutes.js
import express from "express";
import { auth } from "../middlewears/auth.js";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCartBackend } from "../Controller/CartController.js";

const router = express.Router();

router.get("/", auth, getCart);          // fetch all cart items
router.post("/", auth, addToCart);       // add product to cart
router.put("/:id", auth, updateCartItem);// update quantity
router.delete("/:id", auth, removeCartItem);// remove cart item
router.delete("/", auth, clearCartBackend);//to clear all items

export default router;
