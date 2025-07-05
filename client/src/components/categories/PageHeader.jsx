import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Menu, X, User, LayoutDashboard, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";


const PageHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenu, setIsProfileMenu] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { loggedIn, user, logout } = useApp();
  
    const isAdmin = user?.isAdmin;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "New Arrivals", href: "#" },
    { name: "Bras", href: "/category/bras" },
    { name: "Panties", href: "#" },
    { name: "Sets", href: "#" },
    { name: "Sleepwear", href: "#" },
  ]


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
    <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
            <div className="relative flex items-center justify-between px-6">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <img
                  src="/logo.png"
                  alt="Luscious Lingerie Logo"
                  width={80 }
                  height={40 }
                  className="relative object-contain transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

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
                        3
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
                        2
                      </span>
                    </div>
                  </Button>
                </Link>
              )}

                {isLogin ? (
                  <Button
                variant="ghost"
                size="icon"
                className=" hidden lg:flex relative group rounded-xl hover:bg-pink-50"
                onClick={() => setIsProfileMenu(!isProfileMenu)}
              >
                  <User className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              </Button>
                ):(
                  <Button variant="ghost" size="icon" className="hidden lg:flex  relative group rounded-xl hover:bg-pink-50">
                  <LogIn className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                </Button>
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
                ):(<>
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
                </>)}
              </div>
            </div>
          </div>
      </div>
    </header>
  )
}

export default PageHeader