import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Hotel, Search } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, setAuthModalOpen } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Hotel Be Well Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">
              Hotel Be Well
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/hotels"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Hotel
            </Link>
            <Link
              to="/articles"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Artikel
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Profil Website
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Tentang Kami
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <Button
                onClick={() => navigate("/user-profile")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Profil
              </Button>
            ) : (
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Masuk
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
