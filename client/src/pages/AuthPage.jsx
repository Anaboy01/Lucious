import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { toast } from "react-toastify"



const AuthPage = ({ mode = "login" }) => {
  const isLogin = mode === "login"
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phoneNo: "" })
  const navigate = useNavigate()
  const { login, register, message, loading } = useApp()




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password })
        toast.success("Login successful")
        navigate("/")
      } else {
        await register(formData)
        toast.success("Registration successful")
         navigate("/")
      }
    //   navigate("/")
    } catch (err) {
      toast.error(message || "Something went wrong")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <Card className="w-full max-w-md shadow-lg border-pink-100 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (

           <>
               <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phone number"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>
           </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-red-800 text-white"
              disabled={loading}
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Link to="/register" className="text-pink-600 font-medium hover:underline">
                  Register here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-pink-600 font-medium hover:underline">
                  Login here
                </Link>
              </>
            )}
          </p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1 text-sm text-pink-600 font-medium hover:underline"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage
