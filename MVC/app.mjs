import express from 'express';
import productRouter from './router/productRouter.mjs';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.mjs';
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(express.json())

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
console.log("connected successfully")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



//endpoints
app.get('/', (req, res) => {
  res.send('We are learning Express.js!')
})

app.use("/product",productRouter);
app.use("/user",userRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})