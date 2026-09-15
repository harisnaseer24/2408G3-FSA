import express from 'express';
import productRouter from './router/productRouter.mjs';


const app = express()
const port = 3000

app.use(express.json())

//endpoints
app.get('/', (req, res) => {
  res.send('We are learning Express.js!')
})

app.use("/product",productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})