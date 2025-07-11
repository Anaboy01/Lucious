import { createContext, useContext, useEffect, useState } from "react"
import {
  addWish,
  removeWish,
  clearWish,
  getWish,
} from "@/services/wishService" 
import { toast } from "react-toastify"
import { useApp } from "./AppContext"


const WishContext = createContext()

export const WishProvider = ({ children }) => {
  const [wishList, setWishList] = useState([])
  const [loading, setLoading] = useState(false)
  const {loggedIn} = useApp()

  // Fetch wishlist on mount

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const data = await getWish()
      if (!data) {
        return
      }

      setWishList(data.wishList)
      
    } catch (error) {
        toast.error("Error fetching wishlist")
      console.error("Error fetching wishlist:", error)
    } finally {
      setLoading(false)
    }
  }
useEffect(() => {
  if (loggedIn) {
    fetchWishlist()
  } else {
    setWishList([]) 
  }
}, [loggedIn])

  const handleAddWish = async (id) => {
    try {
      await addWish(id)
      await fetchWishlist()
    } catch (error) {
          toast.error("Error adding to wishlist")
      console.error("Error adding to wishlist:", error)
    }
  }

  const handleRemoveWish = async (id) => {
    try {
      await removeWish(id)
      await fetchWishlist()
    } catch (error) {
               toast.error("Error removing from wishlist")
      console.error("Error removing from wishlist:", error)
    }
  }

  const handleClearWish = async () => {
    try {
      await clearWish()
      setWishList([])
    } catch (error) {
          toast.error("Error clearing wishlist")
      console.error("Error clearing wishlist:", error)
    }
  }

  return (
    <WishContext.Provider
      value={{
        wishList,
        loading,
        fetchWishlist,
        handleAddWish,
        handleRemoveWish,
        handleClearWish,
        setWishList
      }}
    >
      {children}
    </WishContext.Provider>
  )
}

export const useWish = () => useContext(WishContext)
