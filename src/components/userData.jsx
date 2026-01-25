import axios from "axios";
import { useState, useEffect } from "react";

const TEMP_AVATAR = "/user.png";


export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutconfirmedopen, setIsLogoutconfirmedopen] = useState(false);

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

      {/* Logout Confirmation Modal */}
      {isLogoutconfirmedopen && (
        <div className="fixed z-[120] h-screen w-full top-0 left-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg">
            <p className="text-secondary mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
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
                className="bg-gray-300 text-secondary px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setIsLogoutconfirmedopen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="w-[28px] h-[28px] border-[3px] border-white border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* Logged-in User */}
      {!loading && user && (
        <div className="flex items-center gap-3 bg-primary px-3 py-1 rounded-full shadow-sm">

          {/* Avatar */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-accent">
            <img
              src={user.image || TEMP_AVATAR}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = TEMP_AVATAR;
              }}
            />

          </div>

          {/* Name */}
          <span className="text-secondary font-medium text-sm">
            {user.firstName}
          </span>

          {/* Select with Logout option */}
          <select
            onChange={(e) => {
              if (e.target.value === "logout") {
                setIsLogoutconfirmedopen(true);
              }
            }}
            className="h-[28px] bg-accent text-white text-sm px-3 rounded-full cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option className="bg-primary text-secondary">
              Select
            </option>
            <option className="bg-primary text-secondary">
              Account Setting
            </option>
            <option className="bg-primary text-secondary">
              Orders
            </option>
            <option value="logout" className="bg-primary text-secondary">
              Logout
            </option>
          </select>
        </div>
      )}

      {/* Login Button */}
      {!loading && user == null && (
        <a
          href="/login"
          className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium
                     hover:bg-accent/90 transition shadow-sm"
        >
          Login
        </a>
      )}
    </div>
  );
}
