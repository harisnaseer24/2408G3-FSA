import express from 'express';
import productRouter from './router/productRouter.mjs';
import mongoose from 'mongoose';



const app = express()
const port = 3000

app.use(express.json())

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://harisnaseer:IToOATRQGWa25z7A@cluster0.h4gftvt.mongodb.net/2408g3');
console.log("connected successfully")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



//endpoints
app.get('/', (req, res) => {
  res.send('We are learning Express.js!')
})

app.use("/product",productRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})