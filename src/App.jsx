import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

/* ================= PAGES ================= */
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
import CheckoutPage from "./pages/checkout";
import Payment from "./pages/payment";
import Orders from "./pages/orders";
import RegisterPage from "./pages/registerPage";
import ForgetPasswordPage from "./pages/forget-password";
import UserSettingPage from "./pages/setting";
import Receipt from "../recipt";

/* ================= PROVIDERS ================= */
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-full min-h-screen">
          <Toaster position="top-right" />

          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ===== USER ROUTES ===== */}
            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductPage />} />

            <Route path="/overview/:id" element={<ProductOverView />} />

            <Route path="/review/:id" element={<ReviewPage />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/payment" element={<Payment />} />

            <Route path="/receipt" element={<Receipt />} />

            <Route path="/setting" element={<UserSettingPage />} />

            {/* ===== ADMIN ROUTES ===== */}
            <Route path="/admin/*" element={<AdminPage />} />

            {/* ===== TEST ===== */}
            <Route path="/test" element={<TestPage />} />

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
