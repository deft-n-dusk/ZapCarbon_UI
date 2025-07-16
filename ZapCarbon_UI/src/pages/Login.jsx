import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import ZapCarbon_Logo from "../assets/ZapCarbon_Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../config";



const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassWord, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: formData.emailId,
          password: formData.password,
        },
        {
          withCredentials: true, // Very important for cookie-based auth
        }
      );
      setMessage("✅ Login Successful")
       setTimeout(() => {
        navigate("/");
       }, 2000)
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data || err.message));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b7c76] via-[#409576] to-[#6bb285] flex items-center justify-center font-sans px-4">
      <div className="bg-[#e2eedf] rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition duration-500 hover:scale-[1.04]">
        <h2 className="text-3xl font-extrabold text-center text-[#3b7c76] mb-6 mr-4">
          Welcome Back To ZapCarbon 
        </h2>
        <img className="w-20 absolute top-14 right-24" src={ZapCarbon_Logo} alt="ZapCarbon Logo" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#94e37f]">
            <FaEnvelope className="text-[#3b7c76] mr-3" />
            <input
              type="email"
              name="emailId"
              placeholder="Email"
              className="flex-1 bg-transparent outline-none text-[#3b7c76]"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#94e37f]">
            <FaLock className="text-[#3b7c76] mr-3" />
            <input
              type={showPassWord? "text" : "password"}
              name="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-[#3b7c76]"
              onChange={handleChange}
              required
            />
            <span className="text-[#3b7c76] mr-2" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassWord ? <FaEye/> : <FaEyeSlash/>}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#409576] hover:bg-[#0a5548]  text-white  hover:font-bold font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            🔐 Log In
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-[#3b7c76] mt-4 animate-pulse">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-[#3b7c76] text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#409576] font-bold hover:underline hover:text-[#0a5548] transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
