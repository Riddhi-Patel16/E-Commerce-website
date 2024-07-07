import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../Assets/upload_area.svg'
const Addproduct = () => {
    const [image,setimage]=useState(false);
    const [productdettails,setproductdetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const changehandler=(e)=>{
        setproductdetails({...productdettails,[e.target.name]:e.target.value})
    }
    const imagehandler=(e)=>{
        setimage(e.target.files[0])
    }
    const Add_product=async()=>{
        let responsedata;
        let product=productdettails;
        let formdata=new FormData();
        formdata.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formdata,
        }).then((resp)=>resp.json()).then((data)=>{responsedata=data})
        if(responsedata.success)
        {
            product.image=responsedata.image_url;
            await fetch('http://localhost:4000/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                if(data.success)
                    alert("Product Added");
                else
                alert("Failed");
            })
        }
    }
  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productdettails.name} onChange={changehandler} type="text"  name='name' placeholder='Type Here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productdettails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
                <p> Offer Price</p>
                <input value={productdettails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Type Here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productdettails.category} onChange={changehandler} name="category" id="" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumnail-img' />
            </label>
            <input onChange={imagehandler} type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={Add_product}className='addproduct-btn' >
            Add
        </button>
    </div>
  )
}

export default Addproduct