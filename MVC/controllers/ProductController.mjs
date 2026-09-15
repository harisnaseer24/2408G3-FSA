import fs from  'node:fs';
const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let products= data.products;
//all products
const getProducts = (req, res) => {
//exception handling
try {
    res.status(200).json(products)
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
//add product
const addProduct =(req, res) => {
//exception handling
try {
let product = req.body
if (product) {
  products.push(product)
  res.json({msg:`New Product added successfully`,product:product})
} else {
    res.json({msg:`Can't add product right now`}) 
}
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}
//add product
const deleteProduct = (req, res) => {
//exception handling
try {
const id = req.params.id;

products = products.filter((item)=>{
  return item.id != id

})

if(products.length ==0) {
  
  res.status(200).json({msg:"No product found. Please give valid id."})
} else {
  res.status(200).json(products)
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

