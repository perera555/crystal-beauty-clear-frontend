import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TEMP_AVATAR = "/user.png";

export default function UserDataMobile() {
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
    <div
      className="
        w-full max-w-full overflow-x-hidden
        px-4 py-4
        flex justify-center items-center
        bg-primary
        border-t border-secondary/10
      "
    >
      {/* ================= LOGOUT MODAL ================= */}
      {isLogoutconfirmedopen && (
        <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-primary rounded-2xl p-6 w-[300px] max-w-[90vw] shadow-xl">
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
                className="
                  flex-1 py-2 rounded-full
                  bg-accent text-primary font-semibold
                  hover:bg-accent/90
                  outline-none
                  focus:outline-none focus:ring-2 focus:ring-accent/40
                "
              >
                Yes
              </button>

              <button
                onClick={() => setIsLogoutconfirmedopen(false)}
                className="
                  flex-1 py-2 rounded-full
                  bg-secondary/10 text-secondary font-semibold
                  hover:bg-secondary/20
                  outline-none
                  focus:outline-none focus:ring-2 focus:ring-accent/40
                "
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading && (
        <div
          className="
            w-[28px] h-[28px]
            border-[3px] border-secondary/30
            border-t-accent
            rounded-full animate-spin
          "
        />
      )}

      {/* ================= USER ================= */}
      {!loading && user && (
        <div
          className="
            w-full
            flex items-center gap-3
            bg-primary
            px-4 py-3
            rounded-2xl
            border border-secondary/10
            shadow-[0_10px_30px_rgba(57,62,70,0.15)]
          "
        >
          {/* Avatar */}
          <div
            className="
              w-[44px] h-[44px]
              rounded-full overflow-hidden
              bg-white
              border-2 border-accent
              flex-shrink-0
            "
          >
            <img
              src={user.image || TEMP_AVATAR}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = TEMP_AVATAR)}
            />
          </div>

          {/* Name */}
          <span className="text-secondary font-medium text-sm flex-1 truncate">
            {user.firstName}
          </span>

          {/* Dropdown (NO BLUE) */}
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
              h-[32px]
              px-3
              text-sm
              rounded-full
              bg-primary
              text-secondary
              border border-secondary/30
              cursor-pointer
              appearance-none
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

      {/* ================= LOGIN ================= */}
      {!loading && !user && (
        <a
          href="/login"
          className="
            bg-accent text-primary
            px-6 py-2.5
            rounded-full
            text-sm font-semibold
            shadow-md
            hover:bg-accent/90
            outline-none
            focus:outline-none focus:ring-2 focus:ring-accent/40
            transition
          "
        >
          Login
        </a>
      )}
    </div>
  );
}
