
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import AboutUs from './Pages/AboutUs'
import Menu from './Pages/Menu'
import Offers from './Pages/Offers'
import Gallery from './Pages/Gallery'
import Blog from './Pages/Blog'
import FAQ from './Pages/FAQ'
import Contact from './Pages/Contact'
import OnlineOrder from './Pages/OnlineOrder'
import DeliveryServices from './Pages/DeliveryServices'
import Cater from './Pages/Cater'
import PartyBook from './Pages/PartyBook'
import GiftCard from './Pages/GiftCard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import LoyaltyProgram from './Pages/LoyaltyProgram'
import Profile from './Pages/Profile'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'

function App() {
  

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/onlineorder' element={<OnlineOrder />} />
        <Route path='/delivery' element={<DeliveryServices />} />
        <Route path='/cater' element={<Cater />} />
        <Route path='/party' element={<PartyBook />} />
        <Route path='/gift' element={<GiftCard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/loyalty' element={<LoyaltyProgram />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
