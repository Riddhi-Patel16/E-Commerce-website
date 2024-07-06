
import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext.jsx'
import {useParams} from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums.jsx';
import Productdisplay from '../Components/ProductDisplay/Productdisplay.jsx';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox.jsx';
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts.jsx';
const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product=all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrums
      product={product}
      />
      <Productdisplay
      product={product}
      />
      <Descriptionbox/>
      <Relatedproducts/>
    </div>
  )
}

export default Product
