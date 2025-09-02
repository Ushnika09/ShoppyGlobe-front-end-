import { configDotenv } from "dotenv"
import express from "express"
import connectDb from "./config/db.js"
import ProductRoutes from "./Routes/ProductRoutes.js"
import UserRoutes from "./Routes/UserRoutes.js"
import cors from "cors"
import CartRoutes from "./Routes/CartRoutes.js"

const app=express()

// ✅ Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

configDotenv()
connectDb()


app.use("/api/products", ProductRoutes);
app.use("/api/auth", UserRoutes);

app.use("/cart", CartRoutes);


app.get("/",(req,res)=>{
    res.send("WELCOME to SHOPPYGLOBE!!")
})

const PORT= process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`);
})