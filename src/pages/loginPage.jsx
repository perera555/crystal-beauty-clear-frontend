import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../AuthContext"; // ✅ FIXED IMPORT

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ SYNC LOGIN WITH CONTEXT

  /* ================= GOOGLE LOGIN ================= */
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/api/users/google-login",
          { token: response.access_token }
        );

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user); // ✅ IMPORTANT

        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error("Google login failed:", e);
        toast.error("Google Login Failed, please try again");
      }
    },
  });

  /* ================= NORMAL LOGIN ================= */
  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user); // ✅ IMPORTANT

      toast.success("Login successful");

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login Failed, please check your credentials");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center flex relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/55"></div>

      <div className="w-1/2 h-full hidden lg:flex flex-col justify-center px-24 relative z-10">
        <h1 className="text-5xl font-light text-white tracking-widest mb-6">
          Crystal Beauty Clear
        </h1>
        <p className="text-lg text-white/80 max-w-md leading-relaxed">
          Discover beauty crafted with care.
          Log in to shop your favorites and continue your beauty journey.
        </p>
      </div>

      <div className="w-full lg:w-1/2 h-full flex justify-center items-center relative z-10 px-6">
        <div className="w-full max-w-[480px] backdrop-blur-2xl bg-white/20 border border-white/30 rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.55)] px-14 py-16 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Crystal Beauty Clear logo"
            className="w-24 mb-6 brightness-0 opacity-90"
            style={{ filter: "invert(92%) sepia(6%) saturate(120%)" }}
          />

          <h2 className="text-4xl font-semibold text-white tracking-wider mb-2">
            Log In
          </h2>
          <p className="text-sm text-white/80 mb-10 text-center">
            Sign in to view your orders, wishlist, and exclusive offers
          </p>

          <div className="w-full mb-6">
            <label className="text-xs text-white/70 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 mt-2 px-4 rounded-xl bg-white/90 text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            />
          </div>

          <div className="w-full mb-3">
            <label className="text-xs text-white/70 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-12 mt-2 px-4 rounded-xl bg-white/90 text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            />
          </div>

          <div className="w-full text-right mb-8">
            <Link
              to="/forgot-password"
              className="text-xs text-white/70 hover:text-[var(--color-primary)] transition"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            onClick={login}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-orange-500 text-white font-semibold tracking-widest shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-[0.96] transition-all duration-200"
          >
            LOG IN
          </button>

          <button
            onClick={googleLogin}
            className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-orange-500 text-white font-semibold tracking-widest shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-[0.96] transition-all duration-200"
          >
            Google LogIn
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/70">
              New to Crystal Beauty Clear?
            </p>
            <Link
              to="/register"
              className="mt-2 text-[var(--color-primary)] font-medium hover:underline tracking-wide"
            >
              Create an account
            </Link>
          </div>

          <p className="text-xs text-white/50 mt-10 tracking-wide">
            © 2026 Crystal Beauty Clear · Beauty you can trust
          </p>
        </div>
      </div>
    </div>
  );
}

