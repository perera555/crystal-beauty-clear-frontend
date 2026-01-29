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

/* ================= PROVIDERS ================= */
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-full min-h-screen">
          <Toaster position="top-right" />

          <Routes>
            {/* ===== MAIN ===== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/overview/:id" element={<ProductOverView />} />

            {/* ===== CART FLOW ===== */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />

            {/* ===== USER ===== */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/setting" element={<UserSettingPage />} />

            {/* ===== ADMIN & OTHER ===== */}
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/review/:id" element={<ReviewPage />} />

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
