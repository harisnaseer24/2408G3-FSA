import express from 'express';
import fs from  'node:fs';

// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));

const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let products= data.products;

// console.log(products)


const app = express()
const port = 3000
const fruits=["Orange", "Apple","Mango"]

// file system



//endpoints
app.get('/', (req, res) => {
  res.send('We are learning Express.js!')
})
// app.get('/products', (req, res) => {
//   res.json({name:"Iphone 17"})
// })

app.get('/fruits', (req, res) => {
  res.status(200).json(fruits)
})

app.get('/products', (req, res) => {
//exception handling
try {
    res.status(200).json(products)
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
})
// request input 
// 1. route parameter (compulsory Lazmi )
app.get('/product/:id', (req, res) => {
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
})

app.delete('/product/:id', (req, res) => {
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

})



// 2. query parameter (optional Ikhtiari)
// 3. request body 




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})