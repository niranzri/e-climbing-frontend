import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import './App.css'

function App() {
  return (
    <div className="pageCtn">
      <Navbar />  
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/products' element={<ShopPage/>} />
        <Route path='/products/:productId' element={<ProductPage/>} />
        <Route path='/profile/wishlist' element={<WishlistPage/>} />
        <Route path='/profile/cart' element={<CartPage />} />
        <Route path='/profile/cart/checkout' element={<CheckoutPage />} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
