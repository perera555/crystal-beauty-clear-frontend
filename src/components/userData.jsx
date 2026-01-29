import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TEMP_AVATAR = "/user.png";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutconfirmedopen, setIsLogoutconfirmedopen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-end items-center px-4 min-h-[56px]">

      {/* ================= LOGOUT MODAL ================= */}
      {isLogoutconfirmedopen && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl w-[320px]">
            <p className="text-secondary mb-6 text-center font-medium">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-4 w-full">
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg
                           hover:bg-red-600 transition font-semibold"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  setIsLogoutconfirmedopen(false);
                  window.location.href = "/login";
                }}
              >
                Yes
              </button>

              <button
                className="flex-1 bg-secondary/10 text-secondary py-2 rounded-lg
                           hover:bg-secondary/20 transition font-semibold"
                onClick={() => setIsLogoutconfirmedopen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="w-[28px] h-[28px] border-[3px] border-secondary/30
                        border-b-accent rounded-full animate-spin">
        </div>
      )}

      {/* ================= LOGGED IN USER ================= */}
      {!loading && user && (
        <div className="flex items-center gap-3 bg-primary px-4 py-2 rounded-full
                        shadow-md border border-secondary/10">

          {/* AVATAR */}
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden
                          border-2 border-accent bg-white">
            <img
              src={user.image || TEMP_AVATAR}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = TEMP_AVATAR;
              }}
            />
          </div>

          {/* NAME */}
          <span className="text-secondary font-semibold text-sm whitespace-nowrap">
            {user.firstName}
          </span>

          {/* SELECT */}
          <select
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value;

              if (value === "account") {
                navigate("/setting");
              }

              if (value === "orders") {
                navigate("/orders");
              }

              if (value === "logout") {
                setIsLogoutconfirmedopen(true);
              }

              e.target.value = "";
            }}
            className="h-[32px] bg-accent text-white text-sm px-4 rounded-full cursor-pointer
                       shadow-lg shadow-black/20
                       focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="" disabled className="bg-primary text-secondary">
              Select
            </option>

            <option value="account" className="bg-primary text-secondary">
              Account Setting
            </option>

            <option value="orders" className="bg-primary text-secondary">
              My Orders
            </option>

            <option value="logout" className="bg-primary text-secondary">
              Logout
            </option>
          </select>
        </div>
      )}

      {/* ================= LOGIN BUTTON ================= */}
      {!loading && user == null && (
        <a
          href="/login"
          className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold
                     hover:bg-accent/90 transition shadow-md"
        >
          Login
        </a>
      )}
    </div>
  );
}
