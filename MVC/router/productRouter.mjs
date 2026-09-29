import express from 'express'
import productController from '../controllers/ProductController.mjs';


const productRouter= express.Router();


productRouter
.get("/",productController.getProducts)
.get("/:id",productController.getSingleProduct)
.post("/",productController.addProduct)
.delete("/:id",productController.deleteProduct)
.put("/:id",productController.updateProduct)

export default productRouter;