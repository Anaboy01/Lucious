import { registerAdmin, checkLoginStatus,loginUser,logoutUser,registerUser,getUserProfile, getCustomers } from "@/services/authService";



export default function TestPage() {
  const handleClick = async () => {
   const res  =await getCustomers()
    alert("user fetched");
    console.log(res);
  };

  const handleLogout = async () => {
    await logoutUser()
    alert("logged out");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Click Me
      </button>
    </div>
  );
}
