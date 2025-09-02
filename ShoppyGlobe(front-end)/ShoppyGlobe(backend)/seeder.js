import axios from "axios";
import dotenv from "dotenv";
import connectDb from "./config/db.js"; // your DB connection
import Product from "./Models/ProductModel.js";

dotenv.config();

// 1️⃣ Connect to DB
connectDb();

// 2️⃣ Main function to fetch and insert products
const seedProducts = async () => {
  try {
    // Fetch 100 products from dummyjson
    const { data } = await axios.get("https://dummyjson.com/products?limit=132");
    const products = data.products;

    if (!products.length) {
      console.log("No products found to insert!");
      process.exit(0);
    }

    // 3️⃣ Map products to only include required fields
    const mappedProducts = products.map((p) => ({
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage,
      thumbnail: p.thumbnail,
      category: p.category,
      brand: p.brand,
      rating: p.rating,
      stock: p.stock,
      images: p.images, // optional
    }));

    // 4️⃣ Insert into MongoDB
    await Product.insertMany(mappedProducts);

    console.log(`✅ Successfully inserted ${mappedProducts.length} products`);
    process.exit(0); // exit script
  } catch (err) {
    console.error("❌ Error inserting products:", err);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();
