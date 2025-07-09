import { Button } from "../ui/button";
import { useState, useEffect, use } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useWish } from "@/context/WishContext";
import { useCart } from "@/context/CartContext";


const FloatingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { loggedIn, user, logout } = useApp();
  const {wishList} = useWish();
  const {cart} = useCart()

  

  const isAdmin = user?.isAdmin;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "New Arrivals", href: "#" },
    { name: "Bras", href: "/category/bras" },
    { name: "Panties", href: "#" },
    { name: "Sets", href: "#" },
    { name: "Sleepwear", href: "#" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsProfileMenu(false);
  };

  const profileIcons = [
    ...(isAdmin ? [{ name: "Dashboard", href: "/admin" }] : []),
    { name: "Logout", action: handleLogout },
  ];

  useEffect(() => {
    setIsLogin(loggedIn);
  }, [loggedIn]);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-0 opacity-95"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          isScrolled ? "px-4" : "px-6"
        }`}
      >
        <div
          className={`relative backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-white/80 rounded-2xl py-3"
              : "bg-white/70 rounded-3xl py-4"
          }`}
        >
          {/* Floating Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-red-500/10 rounded-3xl blur-xl"></div>

          <div className="relative flex items-center justify-between px-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <img
                  src="/logo.png"
                  alt="Luscious Lingerie Logo"
                  width={isScrolled ? 80: 100}
                  height={isScrolled ? 40 : 50}
                  className="relative object-contain transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative group px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-pink-600"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-red-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>

                  {/* Hover Underline */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>

                  {/* Floating Dot */}
                  <div className="absolute -top-1 left-1/2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Heart Button */}
              {isLogin  && !isAdmin && (
                <Link to="/wishList">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative group rounded-xl hover:bg-pink-50"
                  >
                    <Heart className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold leading-none">
                        {wishList.length}
                      </span>
                    </div>
                  </Button>
                </Link>
              )}

              {isLogin  && !isAdmin && (
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative group rounded-xl hover:bg-pink-50"
                  >
                    <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs text-white font-bold leading-none">
                      {cart.length}
                      </span>
                    </div>
                  </Button>
                </Link>
              )}

{isLogin ? (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:flex relative group rounded-xl hover:bg-pink-50"
      >
        <User className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-44 rounded-xl border border-pink-100 bg-white/80 backdrop-blur-lg shadow-lg mt-2">
      <DropdownMenuLabel className="text-pink-600 font-semibold">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-pink-100" />
      {isAdmin && (
        <Link to="/admin">
          <DropdownMenuItem className="group text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-300 rounded-lg">
            Dashboard
          </DropdownMenuItem>
        </Link>
      )}
      <DropdownMenuItem
        onClick={handleLogout}
        className="group text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-300 rounded-lg"
      >
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <Link to="/login">
    <Button
      variant="ghost"
      size="icon"
      className="hidden lg:flex relative group rounded-xl hover:bg-pink-50"
    >
      <LogIn className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
    </Button>
  </Link>
)}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative group rounded-xl hover:bg-pink-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              </Button>
            </div>
          </div>

          <div
            className={`hidden lg:block overflow-hidden transition-all duration-500 ease-out ${
              isProfileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 border-t border-white/20 mt-4">
              <div className="space-y-3">
                {profileIcons.map((item, index) =>
                  item.action ? (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="w-full text-left px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                      onClick={() => setIsProfileMenu(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "max-h-max opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 border-t border-white/20 mt-4">
              <div className="space-y-3">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!isLogin ? (
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                    style={{ animationDelay: `${5 * 0.1}s` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    {profileIcons.map((item, index) =>
                      item.action ? (
                        <button
                          key={item.name}
                          onClick={item.action}
                          className="w-full text-left px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-600 transform hover:translate-x-2"
                          onClick={() => setIsProfileMenu(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
