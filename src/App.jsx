import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homePage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/test";
import LoginPage from "./pages/loginPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import { ReviewPage } from "./pages/reviewPage";
import { ProductPage } from "./pages/productPage";
import ProductOverView from "./pages/productOverview";
import CartPage from "./pages/cart";
import RegisterPage from "./pages/registerPage";
import ForgetPasswordPage from "./pages/forget-password";
import UserSettingPage from "./pages/setting";
import Orders from "./pages/orders";
import Payment from "./pages/payment";

import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-full min-h-screen">
          <Toaster position="top-right" />

          <Routes>
            {/* MAIN */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/overview/:id" element={<ProductOverView />} />

            {/* CART */}
            <Route path="/cart" element={<CartPage />} />

            {/* 🔥 PAYMENT (BOTH PATHS SUPPORTED) */}
            <Route path="/checkout" element={<Payment />} />
            <Route path="/payments" element={<Payment />} />

            {/* USER */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/setting" element={<UserSettingPage />} />

            {/* ADMIN & MISC */}
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/review/:id" element={<ReviewPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
