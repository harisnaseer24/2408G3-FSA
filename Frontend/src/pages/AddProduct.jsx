import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [token, setToken]=useState("")  
    // console.log(categories)
    // const [mycategories,setCategories]= useState([...categories])
    const addProduct= async (e)=>{
      e.preventDefault();
// alert("hi");
let title=document.getElementById("title").value
let description=document.getElementById("desc").value
let rating=document.getElementById("rating").value
let price=document.getElementById("price").value
let brand=document.getElementById("brand").value
let category=document.getElementById("category").value
let images=document.getElementById("image");
let stock=document.getElementById("stock").value
let discountPercentage=document.getElementById("discountPercentage").value

if (title ==""|| description =="" || rating =="" || price==0 || brand=="" || category=="" || images=="" || stock==0 || discountPercentage==0) {
  alert("Please fill all fields")
} else {
  // alert("Calling our API")
// if(images.files.length > 0){
let formData= new FormData();

// for(let i=0;i<images.files.length;i++){

// formData.append("image",images.files[i]);
// }

formData.append("image",images.files[0]);

formData.append("title",title);
formData.append("description",description);
formData.append("rating",rating);
formData.append("price",price);
formData.append("brand",brand);
formData.append("category",category);
formData.append("stock",stock);
formData.append("discount",discountPercentage);
console.log(formData)

let add = await axios.post("http://localhost:3000/product/addproductwithimage",formData,
   {
        headers: {
          'Content-Type': 'multipart/form-data',// image process
          Authorization: `Bearer ${token}`
        },
      }

)
  if(add){
    console.log("Upload successful", add.data);
    alert("Product added successfully.!")
  }else{
    alert("Failed to add product.!")

  }
  
// }else{
//   alert("Please select image")
// }

  
}






    }


    useEffect(()=>{
      let jwtToken= localStorage.getItem("token") || ""
      setToken(jwtToken)

    })



    return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Add a new product..!</h2>
      <div className="row">  
        <div className="col-md-12">
          <form encType='multipart/form-data' onSubmit={addProduct}>
            <div className="mb-3">
              <input type="text" className="form-control" id="title" placeholder="Title" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="desc" placeholder="Description" />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" id="price" placeholder="Price" />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" id="image" multiple="true" placeholder="Choose File"/>
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" id="stock" placeholder="Stock" />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" id="discountPercentage" placeholder="Discount Percentage" />
            </div>
            <div className="mb-3">
              <input   className="form-control" id="category" placeholder="Choose Category" type="text" />
              {/* <select   className="form-control" id="category" placeholder="Choose Category" >
                <option disabled selected>Choose category</option>
                {
                    mycategories.map((item,index)=>{
return (    <option key={index} value={item.title}> {item.title}</option> )
                    })
                }
              </select> */}
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" id="rating" placeholder="Rating" max={5} min={1}/>
            </div>
            <div className="mb-3">
              <input type="brand" className="form-control" id="brand" placeholder="Brand"/>
            </div>
           
            <button type='submit' className="btn btn-danger w-100" >Add product</button>
          </form>
        </div>
      </div>
    </div>
  )

}

export default AddProduct