
import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext.jsx'
import {useParams} from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums.jsx';
import Productdisplay from '../Components/ProductDisplay/Productdisplay.jsx';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox.jsx';
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts.jsx';
const Product = () => {
  const { all_product, loading } = useContext(ShopContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  const {productId}=useParams();
  console.log(all_product);
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
