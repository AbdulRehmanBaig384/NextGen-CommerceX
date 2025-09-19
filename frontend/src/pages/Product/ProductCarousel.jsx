import React from 'react'
import Message from '../../components/Message' 
import Slider from 'react-slick'
import { useGetTopProductQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {FaBox,FaClock,FaShoppingCart,FaStar,FaStore} from 'react-icons/fa'


const ProductCarousel = () => {
  const {data:products,isloading,error}=useGetTopProductQuery()
  const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className='mb-4 xl:block lg:block md:block'>
      {isloading ?null:error?(
        <Message variant='danger'>{error?.data?.message || error.message }</Message>):(
        <Slider {...settings} className='xl:w-[50rem] lg:w-[50rem] md:-[56rem] sm:w-[40rem] sm-block'>
          {products.map(({image,_id,name,price,description,brand,createdAt,numReviews,rating,quantity,countInStock})=>(
            <div key={_id} className='p-3'>
              <img src={image} alt={name} className='w-full rounded-lg object-cover h-[30rem]'/>
              <div className='flex justify-between w-[20rem]'>
                <div className='one'>
                  <h2>{name}</h2>
                  <p>${price}</p><br/><br/>
                  <p className='w-[25rem]'>{description.substring(0,170)}...</p>
                </div>

                <div className='flex justify-between w-[20rem]'>
                  <div className='one'>
                    <h1 className="flex items-center mb-6 w-[8rem] ">
                      <FaStore className='mr-2 text-white'/>Brand:{brand}
                    </h1>
                     <h1 className="flex items-center mb-6 w-[8rem] ">
                      <FaClock className='mr-2 text-white'/>Added:{''}{moment(createdAt).fromNow()}
                    </h1> <h1 className="flex items-center mb-6 w-[8rem] ">
                      <FaStar className='mr-2 text-white'/>Reviews:{numReviews}
                    </h1>

                  </div>
                </div>

                <div className='two'>
                  <h1 className='flex items-center mb-6 w-[5rem]'>
                    <FaStar className='mr-2 text-white '/>Ratings:(Math.round(rating))
                  </h1>
                          <h1 className='flex items-center mb-6 w-[10rem]'>
                    <FaShoppingCart className='mr-2 text-white '/>Quantity:{quantity}
                  </h1>
                          <h1 className='flex items-center mb-6 w-[5rem]'>
                    <FaBox className='mr-2 text-white '/>In Stock:{countInStock})
                  </h1>
                </div>
              </div>
            </div>)
          )}
        </Slider> 
)}
      
    </div>
  )
}

export default ProductCarousel
