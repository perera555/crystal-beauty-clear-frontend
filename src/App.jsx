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



/* ================= ROUTERS ================= */


import { AuthProvider } from "./AuthContext";
import { PermissionProvider } from "./permissionProvider";

import AdminRouter from "../adminRouter";
import Receipt from "../recipt";
import ProtectedRouter from "../proectedRouter";

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgetPasswordPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* ===== PROTECTED USER ROUTES ===== */}
                <Route
                  path="/"
                  element={
                    <ProtectedRouter>
                      <HomePage />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <ProtectedRouter>
                      <ProductPage />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/overview/:id"
                  element={
                    <ProtectedRouter>
                      <ProductOverView />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/review/:id"
                  element={
                    <ProtectedRouter>
                      <ReviewPage />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRouter>
                      <CartPage />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRouter>
                      <CheckoutPage />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRouter>
                      <Orders />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/payment"
                  element={
                    <ProtectedRouter>
                      <Payment />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/receipt"
                  element={
                    <ProtectedRouter>
                      <Receipt/>
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/setting"
                  element={
                    <ProtectedRouter>
                      <UserSettingPage />
                    </ProtectedRouter>
                  }
                />

                {/* ===== ADMIN ONLY ===== */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminRouter>
                      <AdminPage />
                    </AdminRouter>
                  }
                />

                {/* ===== TEST ===== */}
                <Route path="/test" element={<TestPage />} />

                {/* ===== FALLBACK ===== */}
                <Route path="*" element={<LoginPage />} />
              </Routes>
            </div>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;
