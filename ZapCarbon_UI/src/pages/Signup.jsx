import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ZapCarbon_Logo from "../assets/ZapCarbon_Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../config";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    setMessage("");
    try {
      await axios.post(`${BASE_URL}/signup`, formData, {withCredentials : true});
      setMessage("✅ Signup successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000)
      
    } catch (err) {
  console.error("Signup Error:", err.response?.data);
  const errorMsg = err.response?.data || "❌ Signup failed. Try again.";
  setMessage(errorMsg);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b7c76] via-[#409576] to-[#6bb285] flex items-center justify-center font-sans px-4">
      <div className="bg-[#e2eedf] rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:scale-[1.04]">
        
        <h2 className="text-3xl font-extrabold text-center text-[#3b7c76] mb-6 mr-2">
           Welcome to ZapCarbon   
        </h2>
         <img className="w-20 absolute top-5  right-0" src={ZapCarbon_Logo} alt="ZapCarbon Logo" />
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#94e37f]">
            <FaUser className="text-[#3b7c76] mr-3" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="flex-1 bg-transparent outline-none text-[#3b7c76]"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#94e37f]">
            <FaUser className="text-[#3b7c76] mr-3" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="flex-1 bg-transparent outline-none text-[#3b7c76]"
              onChange={handleChange}
              required
            />
          </div>
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
              type={ showPassWord ? "text" : "password"}
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
            className="w-full bg-[#409576] hover:bg-[#0a5548] text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            🚀 Sign Up
          </button>
          
        </form>

        {message && (
          <p className="text-center text-sm text-[#3b7c76] mt-4 animate-pulse">
            {message}
          </p>
        )}
         <p className="mt-6 text-center text-[#3b7c76] text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#409576] font-bold hover:underline hover:text-[#0a5548] transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
