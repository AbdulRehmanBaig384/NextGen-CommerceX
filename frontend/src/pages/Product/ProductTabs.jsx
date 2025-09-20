// import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Ratings from './Ratings'
// import { useGetTopProductQuery } from '../../redux/api/productApiSlice'
// import Loader from '../../components/Loader'
// import SmallProduct from './SmallProduct'


// const ProductTabs = ({loadingProductReview,userInfo,submitHandler,rating,setRating,comment,setComment,product}) => {
//     const {data,isloading}=useGetTopProductQuery()

//     const [activeTab,setActiveTab]=useState('1')

//     if(isloading){
//         return <Loader/>
//     }
//    const HandleTabClick=(tabnumber)=>{
//     setActiveTab(tabnumber);
//    }
//   return (
//     <div className='flex flex-col md:flex-row'>
//         <section className='mr-[5rem]'>
//             <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===1?'font-bold':''}`} onClick={()=>HandleTabClick(1)}>Write your Review</div>

//               <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===2?'font-bold':''}`} onClick={()=>HandleTabClick(2)}>ALL Review</div>

//                 <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===3?'font-bold':''}`} onClick={()=>HandleTabClick(3)}>Related Products</div>
       
       
       
//         </section>
      
//       <section>{activeTab===1 &&(
//         <div className='mt-4'>{userInfo ?(<form onSubmit={submitHandler}>
//           <div className='my-2'>
//             <label className='block text-xl mb-2' htmlFor='rating'></label>

//             <select className='border rounded-lg xl:w-[40rem] text-black w-full p-2 ' id='rating' value={rating} onChange={(e)=>setRating(e.target.value)}>
//               <option value=''>Select...</option>
//               <option value='1'>1 - Poor</option>
//               <option value='2'>2 - Fair</option> 
//               <option value='3'>3 - Good</option>
//               <option value='4'>4 - Very Good</option>
//               <option value='5'>5 - Excellent</option>
//             </select>
//           </div>
//           <div className="my-2">
//             <label htmlFor='comment' className='block text-xl mb-2'>Comments</label>
//             <textarea id='comment' rows='3' required value={comment} onChange={(e)=>setComment(e.target.value)} className='border rounded-lg xl:w-[40rem] text-black'></textarea>
//             <button disabled={loadingProductReview} className='bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600' type='submit'>{loadingProductReview ? 'Submitting...':'Submit'}</button>
//           </div>
//         </form>):(
//           <p>Please <Link to='/login'>Sign in </Link>to write a review</p>
//         )}</div>
//       )}</section>

//       <section>
//         {activeTab===2 &&(
//           <>
//           <div className='mt-2'>
//             {product.reviews.length===0 && <p>No Reviews</p>}
//           </div>

//           <div>
//             {<product.reviews.map((review)=>(
//               <div key={review._id} className='border-b my-4 bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5'>
//                 <div className="flex justify-between">
//                   <strong className='text-[#B0B0B0]'>{review.name}</strong>
//                   <p className='text-[#B0B0B0]'>
//                     {review.createdAt.subString(0,10)}
//                   </p>
//                 </div>

//                 <p className='my-4'>{r\









import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import { useGetTopProductQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import SmallProduct from './SmallProduct'

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductQuery()
  const [activeTab, setActiveTab] = useState(1)

  if (isLoading) {
    return <Loader />
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Tabs */}
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write your Review
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(2)}
        >
          ALL Review
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Tab 1 - Write Review */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label className="block text-xl mb-2" htmlFor="rating">
                    Rating
                  </label>

                  <select
                    className="border rounded-lg xl:w-[40rem] text-black w-full p-2"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="comment"
                    className="block text-xl mb-2"
                  >
                    Comments
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                  <button
                    disabled={loadingProductReview}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600"
                    type="submit"
                  >
                    {loadingProductReview ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            ) : (
              <p>
                Please <Link to="/login">Sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      {/* Tab 2 - All Reviews */}
      <section>
        {activeTab === 2 && (
          <>
            <div className="mt-2">
              {product.reviews.length === 0 && <p>No Reviews</p>}
            </div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b my-4 bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Tab 3 - Related Products */}
      <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {data?.map((product) => (
              <div key={product._id} className="m-4">
                <SmallProduct product={product} />
              </div>
            ))}
          </section>
        )}
      </section>
    </div>
  )
}

export default ProductTabs
