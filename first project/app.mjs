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

// body
app.use(express.json())




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
app.get('/theme', (req, res) => {
//exception handling
try {

let color = req.query.color

if (color) {
  res.json({msg:`Your theme is set to ${color}`})
  
} else {
    res.json({msg:`Your theme is set to dark`})
  
}



} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
})



// 3. request body 
//body parser (built in middleware)

app.post('/welcome', (req, res) => {
//exception handling
try {

let name = req.body.name

if (name) {
  res.json({msg:`welcome ${name}`})
  
} else {
    res.json({msg:`can't get your name mate`})
  
}
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
})


// add product api
app.post('/product', (req, res) => {
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
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})