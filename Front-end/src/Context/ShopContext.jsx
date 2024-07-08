import { useEffect, useState } from 'react';
import React, { createContext }from "react";
export const ShopContext=createContext(null);    
const getdefaultcart=()=>{
        let cart={};
        for (let index = 0; index < 300+1; index++) {
            cart[index]=0;
        }
        return cart;
    }
const ShopContextProvider=(props)=>{
    const [all_product,setall_product]=useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems,setCartItems]=useState(getdefaultcart());
    const fetchdata=()=>{
        fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setall_product(data.products);setLoading(false);})
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            }).then((res)=>res.json()).then((cartdata)=>setCartItems(cartdata));
        }
         }
    useEffect(()=>{fetchdata()},[])
    const addtocart=(id)=>{
        setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
        if(localStorage.getItem('auth-token'))
        {
            fetch("http://localhost:4000/addtocart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    "itemid":id
                })
            }).then((res)=>res.json()).then((data)=>console.log(data))
        }
    }
    const removetocart=(id)=>{
        setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
        if(localStorage.getItem('auth-token'))
            {
                fetch("http://localhost:4000/removefromcart",{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        "itemid":id
                    })
                }).then((res)=>res.json()).then((data)=>console.log(data))
            }
    }
    const gettotalcartamount=()=>{
        let totalamount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let iteminfo=all_product.find((product)=>product.id===Number(item))
                totalamount+=iteminfo.new_price*cartItems[item];
            }
        }
        return totalamount;
    }
    const gettotalcartitem=()=>{
        let totalitem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalitem+=cartItems[item];
            }
        }
        return totalitem;
    }    
    const contextValue={all_product,cartItems,addtocart,removetocart,gettotalcartamount,gettotalcartitem,loading};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;