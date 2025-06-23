import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Hotel,
  Search,
  LogOut,
  Settings,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, setAuthModalOpen, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 border-2 border-blue-200">
                      <AvatarImage src="https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/user-profile")}
                    className="cursor-pointer"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profil Saya</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/hotels")}
                    className="cursor-pointer"
                  >
                    <Hotel className="mr-2 h-4 w-4" />
                    <span>Cari Hotel</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
