import { registerAdmin, checkLoginStatus,loginUser,logoutUser,registerUser,getUserProfile, getCustomers } from "@/services/authService";
import { addWish, getWish, removeWish, clearWish } from "@/services/wishService";



export default function TestPage() {
  const handleClick = async () => {
   const res  =await addWish(1002)
    alert("wish fetched");
    console.log(res);
  };

  const handleLogout = async () => {
    await logoutUser()
    alert("logged out");
  }



  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Click Me
      </button>
    </div>
  );
}
