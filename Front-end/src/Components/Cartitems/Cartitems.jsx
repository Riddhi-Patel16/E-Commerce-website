import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import './Cartitems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
const Cartitems = () => {
    const {all_product,cartItems,removetocart,gettotalcartamount}=useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((item,i)=>{
            if(cartItems[item.id]>0)
            {
                return <div>
                    <div className="cartitems-format cartitems-format-main ">
                        <img src={item.image} className='carticon-product-icon' alt="" />
                        <p>{item.name}</p>
                        <p>${item.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[item.id]}</button>
                        <p>${item.new_price*cartItems[item.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{
                            removetocart(item.id)
                        }} alt="" />
                    </div>
                </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${gettotalcartamount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${gettotalcartamount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                        
            <div className="cartitems-promocode">
                    <p>If you have promo code,Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Submit</button>
                    </div>
                </div>
                </div>  
        </div>
    
  )
}

export default Cartitems