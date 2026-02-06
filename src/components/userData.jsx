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

    if (token) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user ?? res.data);
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

      {/* LOGOUT MODAL */}
      {isLogoutconfirmedopen && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex justify-center items-center">
          <div className="bg-primary rounded-2xl p-8 w-[320px] shadow-xl">
            <p className="text-secondary mb-6 text-center font-medium">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  setIsLogoutconfirmedopen(false);
                  window.location.href = "/login";
                }}
                className="flex-1 bg-accent text-primary py-2 rounded-lg
                           font-semibold hover:bg-accent/90
                           focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                Yes
              </button>

              <button
                onClick={() => setIsLogoutconfirmedopen(false)}
                className="flex-1 bg-secondary/10 text-secondary py-2 rounded-lg
                           font-semibold hover:bg-secondary/20
                           focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="w-[28px] h-[28px] border-[3px]
                        border-secondary/30 border-t-accent
                        rounded-full animate-spin" />
      )}

      {/* USER */}
      {!loading && user && (
        <div className="flex items-center gap-3 bg-primary px-4 py-2
                        rounded-full shadow-md border border-secondary/10">

          <div className="w-[42px] h-[42px] rounded-full overflow-hidden
                          border-2 border-accent bg-white">
            <img
              src={user.image || TEMP_AVATAR}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = TEMP_AVATAR)}
            />
          </div>

          <span className="text-secondary font-semibold text-sm">
            {user.firstName}
          </span>

          <select
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value;
              if (value === "account") navigate("/setting");
              if (value === "orders") navigate("/orders");
              if (value === "logout") setIsLogoutconfirmedopen(true);
              e.target.value = "";
            }}
            className="
              h-[32px] px-4 text-sm rounded-full
              bg-primary text-secondary
              border border-secondary/30
              appearance-none cursor-pointer
              outline-none
              focus:outline-none
              focus:ring-2 focus:ring-accent/40
              focus:border-accent
            "
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

      {/* LOGIN */}
      {!loading && !user && (
        <a
          href="/login"
          className="bg-accent text-primary px-5 py-2 rounded-full
                     text-sm font-semibold hover:bg-accent/90
                     focus:outline-none focus:ring-2 focus:ring-accent/40
                     transition shadow-md"
        >
          Login
        </a>
      )}
    </div>
  );
}
