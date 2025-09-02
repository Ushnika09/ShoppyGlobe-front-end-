import Product from "../Models/ProductModel.js";

export const getAllProducts=async (req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products)
    }catch(err){
         res.status(500).json({ message: "Failed to fetch products", error: err });
    }
} 

export const getProductById=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product)
    }catch(err){
         res.status(500).json({ message: "Failed to fetch product", error: err });
    }
} 