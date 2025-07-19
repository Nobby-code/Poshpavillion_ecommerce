import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryList from './pages/CategoryList';
import Carousel from './pages/Carousel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Header />
      {/* <CategoryList /> */}
      {/* <Carousel /> */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <>
            <Carousel />
            <Home />
            </>
            
          } 
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
