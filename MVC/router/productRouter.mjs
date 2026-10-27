import express from 'express'
import productController from '../controllers/ProductController.mjs';
import { upload } from '../cloudinaryConfig.mjs';
import auth from '../controllers/middlewares/auth.mjs';


const productRouter= express.Router();


productRouter
.get("/",auth,productController.getProducts)
.get("/:id",productController.getSingleProduct)

//admin
.post("/",productController.addProduct)

.post("/addproductwithimage", upload.single('image') , productController.addProductWithImage)
.delete("/:id",productController.deleteProduct)
.put("/:id",productController.updateProduct)

export default productRouter;