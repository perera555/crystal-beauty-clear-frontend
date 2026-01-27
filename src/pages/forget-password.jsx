import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function sendOTP() {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/send-otp`,
        {
          params: { email: email.trim() },
        }
      );

      toast.success(`OTP sent to ${email}`);
      setStep("otp");
    } catch (e) {
      console.error("Send OTP Error:", e);

      const message =
        e.response?.data?.message ||
        "Failed to send OTP. Please try again.";

      toast.error(message);
    }
  }

  async function changePassword() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password`,
        {
          email: email.trim(),
          otp,
          newPassword,
        }
      );

      toast.success("Password changed successfully");
      navigate("/login");
    } catch (e) {
      console.error("Reset Password Error:", e);

      const message =
        e.response?.data?.message ||
        "OTP is incorrect or expired";

      toast.error(message);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center flex justify-center items-center">
      {step === "email" && (
        <div className="w-[400px] h-[400px] backdrop-blur-md bg-white/30 rounded-2xl p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <p className="text-gray-600 mb-6">
            Enter your email to reset your password.
          </p>

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <button
            onClick={sendOTP}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="w-[400px] backdrop-blur-md bg-white/30 rounded-2xl p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

          <input
            type="text"
            value={otp}
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="password"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <button
            onClick={changePassword}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}
