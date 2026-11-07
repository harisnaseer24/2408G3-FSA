import express from 'express'
import productController from '../controllers/ProductController.mjs';
import { upload } from '../cloudinaryConfig.mjs';
import auth from '../controllers/middlewares/auth.mjs';
import adminAuth from '../controllers/middlewares/adminAuth.mjs';


const productRouter= express.Router();


productRouter
.get("/",productController.getProducts)
.get("/:id",productController.getSingleProduct)

//admin
.post("/",adminAuth,productController.addProduct)

.post("/addproductwithimage",adminAuth, upload.single('image') , productController.addProductWithImage)
.delete("/:id",productController.deleteProduct)
.put("/:id",productController.updateProduct)

export default productRouter;