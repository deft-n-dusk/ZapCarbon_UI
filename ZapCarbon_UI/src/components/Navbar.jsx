import { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

    const backendURL = "http://localhost:2707";
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
        await axios.post(`${backendURL}/logout`, {}, { withCredentials: true });
        navigate("/login"); // ✅ this is enough
    } catch (err) {
        console.error("Logout failed:", err); // Add logging to debug
    }
    };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-sm border-b border-white/20 text-slate-700 px-6 py-3 flex items-center justify-between mb-4">
      {/* Logo */}
      <div className="text-[1.6rem] font-semibold text-[#0a473f] pl-2">ZapCarbon.</div>

      {/* Hamburger Icon */}
      <button
        className="focus:outline-none text-[#0a473f]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-6 top-16 bg-white/50 backdrop-blur-sm  border text-[#1c5a51] border-white/20 rounded-lg shadow-md w-40 py-2">
          <ul className="space-y-1 text-md font-semibold">
            <li>
              <Link to="/" className="block px-4 py-2 hover:bg-white/60">
                Dashboard
                </Link>
            </li>
            <li>
              <Link to="/summary" className="block px-4 py-2 hover:bg-white/60">
                Summary
              </Link>
            </li>
            <li>
              <Link to="/history" className="block px-4 py-2 hover:bg-white/60">
                History
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="block px-4 py-2 hover:bg-white/60 text-red-500">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
