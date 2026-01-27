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
    <div className="w-full h-full bg-primary flex p-2 text-secondary">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-5">
        <div className="flex w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-5">
          <img src="logo.png" alt="Admin" className="h-full" />
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>

        <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
          <FaChartLine /> Dashboard
        </Link>

        <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
          <MdShoppingCartCheckout /> Orders
        </Link>

        <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
          <BsBox2Heart /> Products
        </Link>

        <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
          <HiOutlineUsers /> Users
        </Link>
      </div>

      <div className="flex-1 border-2 border-accent rounded-2xl overflow-hidden">
        {userloaded ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/updateproduct" element={<UpdateProductPage />} />
            <Route path="/users" element={<AdminUsersPage/>} />
          </Routes>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
