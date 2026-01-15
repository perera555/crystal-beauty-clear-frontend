
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import TestPage from './pages/test';
import LoginPage from './pages/loginPage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
import ProductPage from './pages/productPage';
import { ReviewPage } from './pages/reviewPage';




function App() {


  return (
    

    <BrowserRouter>
      <div className='w-full h-[100vh] '>
        <Routes path='/'>
          <Route path='/*' element={<HomePage />} />
           <Route path='/product' element={<ProductPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          

          <Route path='/register' element={<h1>Register Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          {/* we need to modify review url to review/:id to make sure the attached id is passing into the review page as "id" */}
          <Route path='/review/:id' element={<ReviewPage />} />
      

        </Routes>
      </div>
    </BrowserRouter>




  )
}

export default App;
