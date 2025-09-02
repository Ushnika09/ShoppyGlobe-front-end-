import Cart from "../Models/CartModel.js";
import Product from "../Models/ProductModel.js";

// GET /cart → fetch all cart items for logged-in user
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id })
      .populate("product", "title price thumbnail stock"); 
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
};

// POST /cart → add a product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cartItem = await Cart.findOne({ user: req.user.id, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ user: req.user.id, product: productId, quantity });
    }

    await cartItem.save();
    await cartItem.populate("product", "title price thumbnail stock");

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

// PUT /cart/:id → update quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user.id });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();
    await cartItem.populate("product", "title price thumbnail stock");

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart", error: err.message });
  }
};

// DELETE /cart/:id → remove item
export const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
};


// DELETE /cart → clear all items for logged-in user
export const clearCartBackend = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.id });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
};
