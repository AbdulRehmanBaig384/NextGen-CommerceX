import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = ({value,text,color}) => {
  const fullstar=Math.floor(value)
  const halfStar=value-fullstar >0.5 ? 1:0;
  const emptyStar=5-fullstar-halfStar;
    return (
    <div className='flex items-center'>
        {[...Array(fullstar)].map((_,i)=>(
            <FaStar  key={i}  className={`text-${color} ml-1`}></FaStar>
        ))}
      {halfStar===1 && <FaStarHalfAlt  className={`text-${color} ml-1`}></FaStarHalfAlt>}
         {[...Array(emptyStar)].map((_,i)=>(
            <FaRegStar  key={i}  className={`text-${color} ml-1`}></FaRegStar>
        ))}

        <span className={`rating-text ml-{2rem} text-${color}`}>{text && text}</span>
    </div>
  )
};
Ratings.defaultProps={
    color:'yellow-500'
}
export default Ratings
