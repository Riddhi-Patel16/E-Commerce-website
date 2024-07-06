import { useState } from 'react';
import React, { createContext }from "react";
import all_product from '../Components/Assets/all_product'
export const ShopContext=createContext(null);    
const getdefaultcart=()=>{
        let cart={};
        for (let index = 0; index < all_product.length; index++) {
            cart[index]=0;
        }
        return cart;
    }
const ShopContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState(getdefaultcart());
    const addtocart=(id)=>{
        setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
        console.log(id);
    }
    const removetocart=(id)=>{
        setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
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
    const contextValue={all_product,cartItems,addtocart,removetocart,gettotalcartamount,gettotalcartitem};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;