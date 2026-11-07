// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {


const [products, setProducts]= useState([]);

let getProducts= async ()=>{
let response = await axios.get("http://localhost:3000/product");
let data = await response.data;
setProducts([...data])
console.log(data);
}


useEffect(()=>{
  getProducts();
},[]);

  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products apiProducts={products} />
      <Footer/>
    </div>
  );
};

export default Home;
