import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../Assets/cross_icon.png'
const Listproduct = () => {

  const [allproducts,setallproducts]=useState([]);
  const fetchinfo=async()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{
      setallproducts(data.products);
      console.log(allproducts);
    })
  }
  useEffect(()=>{
    fetchinfo();
  },[])

  const remove_product=async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success)
      {
        alert("product removed");
      }
      else
      alert("error occur");
    })
    await fetchinfo();
    }

  if (!Array.isArray(allproducts)) {
    return <p>Loading...</p>; // or handle error state here
  }
  return (
    <div className='listproduct
    '>
        <h1>All Product List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproducts-allproducts">
          <hr />
          {allproducts.map((product,i)=>{
              return (<><div key={i} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-item" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img src={cross_icon} onClick={()=>{remove_product(product.id)}} alt="" className="listproduct-remove-icon" />
              </div>
              <hr/>
            </>)
          })}
        </div>
    </div>
  )
}

export default Listproduct