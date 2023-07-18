import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
//import Success from "./pages/Success";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/products/:category" element={<ProductList/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/>
      {/* <Route path="/success" element={<Success/>}/> */}
      <Route path="/login"
        element = {user ? <Navigate to = "/"/> : <Login/>}/>
      <Route path="/register" element = {user ? <Navigate to = "/"/> : <Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
