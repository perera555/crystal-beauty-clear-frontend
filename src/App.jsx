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

/* ================= CONTEXT ================= */




/* ================= PROVIDERS ================= */
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext";
import { PermissionProvider } from "./permissionProvider";
import AdminRouter from "../AdminRouter";

function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="w-full min-h-screen">
              <Toaster position="top-right" />

              <Routes>
                {/* ===== PUBLIC ===== */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgetPasswordPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* ===== PAYMENT ===== */}
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/:orderId" element={<Payment />} />

                {/* ===== PRODUCTS ===== */}
                <Route path="/products" element={<ProductPage />} />
                <Route path="/overview/:id" element={<ProductOverView />} />
                <Route path="/review/:id" element={<ReviewPage />} />

                {/* ===== CART / ORDER ===== */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/receipt/:orderId" element={<Receipt />} />

                {/* ===== USER ===== */}
                <Route path="/setting" element={<UserSettingPage />} />

                {/* ===== ADMIN (PROTECTED) ===== */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminRouter>
                      <AdminPage />
                    </AdminRouter>
                  }
                />

                {/* ===== OTHER ===== */}
                <Route path="/test" element={<TestPage />} />

                {/* ===== FALLBACK ===== */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;
