import fs from  'node:fs';
import Product from '../models/productModel.mjs';

//all products
const getProducts = async (req, res) => {
//exception handling
try {
  const products= await Product.find();
   res.status(200).json(products)
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}

//add product
const addProduct = async (req, res) => {
//exception handling
try {
let product = req.body
if (product) {

  // object mapping
  const newProduct= Product({
title: product.title,
description: product.description,
price: product.price,
discount: product.discount,
rating: product.rating,
stock: product.stock,
brand: product.brand,
category: product.category,
images: product.images,

  })

  const addProduct = await newProduct.save();
  if(addProduct){
    
    res.json({msg:`New Product added successfully`,product:addProduct})
  }else{

    res.json({msg:`Can't add product right now`}) 
  }

} else {
   res.json({msg:`Can't add product right now`}) 
}
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}


// 03241257793
//add product
const deleteProduct =async (req, res) => {
//exception handling
try {
const id = req.params.id;

const product = await Product.findOne({ _id:id});
if(product != null){


  const delProduct= await Product.deleteOne({ _id:id})


if (delProduct) {
    res.status(200).json({msg:"Product deleted successfully.", product:delProduct})
  
} else {
  
  res.status(200).json({msg:"Fail to delete product."})
}
} else {
  res.status(200).json({msg:"No product found. Please give valid id."})
}
   
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}

}




//single product api
const getSingleProduct = (req, res) => {
//exception handling
try {
const id = req.params.id;
const product = products.filter((item)=>{
  return item.id == id
})
if (product !=null) {
   res.status(200).json(product)

} else {
   res.status(200).json({msg:"No product found. Please give valid id."})
}
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}





const productController ={
    getProducts,
    getSingleProduct,
    addProduct,
    deleteProduct
}

export default productController;

