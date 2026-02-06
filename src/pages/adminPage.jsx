import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrderPage";
import AdminDashboard from "./dashboard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "../components/Loader";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage() {
  const navigate = useNavigate();
  const [userloaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login to access admin Panel");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user.role !== "admin") {
          toast.error("You are not authorized to access admin Panel");
          navigate("/");
          return;
        }
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("Session expired, please Login again");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-primary flex gap-8 p-8 text-secondary">

      {/* ================= SIDEBAR ================= */}
      <div className="
        w-[300px]
        bg-secondary
        rounded-3xl
        shadow-2xl
        flex flex-col
        items-center
        py-8
      ">

        {/* LOGO */}
        <div className="
          flex w-[90%] h-[70px]
          bg-accent
          items-center
          rounded-2xl
          mb-10
          px-4
          shadow-lg
        ">
          <img src="logo.png" alt="Admin" className="h-full object-contain" />
          <span className="text-white text-xl font-semibold ml-4 tracking-wide">
            Admin Panel
          </span>
        </div>

        {/* NAVIGATION */}
        <div className="w-full flex flex-col gap-2 items-center">

          <Link
            to="/admin"
            className="
              w-[90%]
              flex items-center gap-3
              px-6 py-3
              rounded-xl
              text-primary
              font-medium
              transition-all
              hover:bg-accent hover:text-white
            "
          >
            <FaChartLine />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="
              w-[90%]
              flex items-center gap-3
              px-6 py-3
              rounded-xl
              text-primary
              font-medium
              transition-all
              hover:bg-accent hover:text-white
            "
          >
            <MdShoppingCartCheckout />
            Orders
          </Link>

          <Link
            to="/admin/products"
            className="
              w-[90%]
              flex items-center gap-3
              px-6 py-3
              rounded-xl
              text-primary
              font-medium
              transition-all
              hover:bg-accent hover:text-white
            "
          >
            <BsBox2Heart />
            Products
          </Link>

          <Link
            to="/admin/users"
            className="
              w-[90%]
              flex items-center gap-3
              px-6 py-3
              rounded-xl
              text-primary
              font-medium
              transition-all
              hover:bg-accent hover:text-white
            "
          >
            <HiOutlineUsers />
            Users
          </Link>
        </div>

        {/* BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="
            mt-auto
            mb-4
            w-[90%]
            py-3
            rounded-xl
            border border-primary
            text-primary
            font-semibold
            tracking-wide
            transition-all
            hover:bg-primary hover:text-secondary
          "
        >
          Back to Home
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="
        flex-1
        bg-primary
        rounded-3xl
        shadow-2xl
        border border-accent/30
        overflow-hidden
      ">
        {userloaded ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/updateproduct" element={<UpdateProductPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
          </Routes>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
