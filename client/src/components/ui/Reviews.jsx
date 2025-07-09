import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useProduct } from "@/context/ProductContext"
import { toast } from "react-toastify"

const Reviews = ({ reviews, product, fetchProduct }) => {
  const [userReview, setUserReview] = useState("")

  const {addReview} = useProduct()


  const [allReviews, setAllReviews] = useState(reviews)
  const [currentPage, setCurrentPage] = useState(1)

  const reviewsPerPage = 5
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage)

  const currentReviews = allReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  const handleReviewSubmit =  async () => {
   
   try {
       const res = await addReview(product.id, userReview)
      
     if (res?.message) {
         toast.success(res.message);
       } else {
         toast.success("Thanks for your review");
       }
       await fetchProduct()
        setUserReview("")
    setCurrentPage(1) 
      } catch (error) {
        console.error(error);
       toast.error("Failed to review");
      }
  
  }

  useEffect(() => {
  setAllReviews(reviews);
}, [reviews]);

  return (
    <div className="mt-16 border-t pt-8">
      <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center mb-6">
       <div className="flex items-center gap-2">
         <h2 className="text-2xl font-bold">Customer Reviews</h2>
         <span>({reviews.length})</span>
       </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pink-600 text-white hover:bg-pink-700">Add Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Your Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <textarea
                placeholder="Write your review..."
                className="w-full border rounded px-4 py-2"
                rows={4}
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              />
              <Button
                disabled={!userReview.trim()}
                onClick={handleReviewSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-red-800 text-white"
              >
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {currentReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          currentReviews.map((review, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                {review.userPhoto ? (
                  <img
                    src={review.userPhoto}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                    {review.userName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{review.userName}</p>
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default Reviews
