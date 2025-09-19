import jwt from 'jsonwebtoken'
import User from '../models/userModel.js' 
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (request, response, next) => {
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }

  if (!token) {
    response.status(401);
    throw new Error('Not Authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    response.status(401);
    throw new Error('Not Authorized, token Failed');
  }
});




 const authorizeAdmin=(request,response,next)=>{
     if(request.user && request.user.isAdmin){
        next()
     }
     else{
        response.status(201).send("Not authorized as an admin")
     }
 }

 export {authenticate,authorizeAdmin}
