import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AllProductsPage from './pages/AllProductsPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import './App.css'

function App() {
  return (
    <> 
    <Navbar />  
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/auth' element={<AuthPage/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/products' element={<AllProductsPage/>} />
      <Route path='/profile/wishlist' element={<WishlistPage/>} />
      <Route path='/profile/cart' element={<CartPage />} />
      <Route path='/profile/cart/checkout' element={<CheckoutPage />} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
