
import Navbar from './Components/Navbars/Navbar'
import './App.css'
import Shop from './Pages/Shop'
import Product from './Pages/Product'
import Loginsignup from './Pages/Loginsignup'
import Cart from './Pages/Cart'
import Shopcategory from './Pages/Shopcategory'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/women' element={<Shopcategory banner={women_banner} category="women"/>}/>
        <Route path='/mens' element={<Shopcategory banner={men_banner} category="men"/>}/>
        <Route path='/kids'
         element={<Shopcategory banner={kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product/>} >       
         <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Loginsignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
   
  )
}

export default App
