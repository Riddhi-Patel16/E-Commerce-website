import React, { useContext, useState } from "react";
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart from "../Assets/cart_icon.png"
import {Link} from 'react-router-dom'
import { ShopContext } from "../../Context/ShopContext";
function Navbar()
{
    const {gettotalcartitem}=useContext(ShopContext)
    const [menu,setmenu]=useState("shop");
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>Shopper</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none',color: '#515151'}} to='/'>Shop </Link>{menu==="shop"&&<hr/>}</li>
                <li onClick={()=>{setmenu("mens")}}><Link style={{textDecoration:'none',color: '#515151'}} to='/mens'>Men</Link>{menu==="mens"&&<hr/>}</li>
                <li onClick={()=>{setmenu("women")}}><Link  style={{textDecoration:'none',color: '#515151'}}to='/women'>Women</Link>{menu==="women"&&<hr/>}</li>
                <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none',color: '#515151'}}to='/kids'>Kids</Link>{menu==="kids"&&<hr/>}</li>
            </ul>
                <div className="nav-login-cart">
                   <Link style={{textDecoration:'none',color: '#515151'}}to='/login'> <button>Login</button></Link>
                    <Link style={{textDecoration:'none',color: '#515151'}}to='/cart'><img src={cart} alt="cart" /></Link>
                    <div className="nav-cart-count">{gettotalcartitem()}</div>
                </div>
        </div>
 
    )
}
export default Navbar



