
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import TestPage from './pages/test';
import LoginPage from './pages/loginPage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
import { ReviewPage } from './pages/reviewPage';
import { Toaster } from 'react-hot-toast';
import { ProductPage } from './pages/productPage';
import ProductOverView from './pages/productOverview';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import RegisterPage from './pages/registerPage';
import { GoogleOAuthProvider } from '@react-oauth/google';






function App() {


  return (


    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='w-full h-[100vh] '>
        <Toaster position='top-right' />
        <Routes path='/'>
          <Route path='/*' element={<HomePage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/overview/:id' element={<ProductOverView />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />

          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          {/* we need to modify review url to review/:id to make sure the attached id is passing into the review page as "id" */}
          <Route path='/review/:id' element={<ReviewPage />} />


        </Routes> 
      </div>
      </GoogleOAuthProvider>
    </BrowserRouter>




  )
}

export default App;
