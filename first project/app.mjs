import express from 'express';
const app = express()
const port = 3000
const fruits=["Orange", "Apple","Mango"]


//endpoints
app.get('/', (req, res) => {
  res.send('We are learning Express.js!')
})
app.get('/products', (req, res) => {
  res.json({name:"Iphone 17"})
})

app.get('/fruits', (req, res) => {
  res.status(200).json(fruits)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})