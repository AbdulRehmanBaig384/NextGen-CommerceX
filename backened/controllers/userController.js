import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/createToken.js";
import express from "express";
const createUser=asyncHandler(async (request,response)=>{
    const {username,email,password}=request.body
    //  console.log(username)
    //  console.log(email)
    //  console.log(password)
    if(!username || !email || !password){
        throw new Error("Please fill out the all input")
    }
    const userExist=await User.findOne({email})
    if(userExist){
        response.status(400).send('User Already Exist')
    }
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)

    const newUser=new User({username,email,password:hashPassword})
    try{
        await newUser.save()
        generateToken(response,newUser._id)
        response.status(201).json({_id:newUser._id,username:newUser.username,email:newUser.email,isAdmin:newUser.isAdmin})
    }catch(error){
             console.log(error)
    };
    
})
const loginUser=asyncHandler(async(request,response)=>{
const {email,password}=request.body
const existingUser=await User.findOne({email})
if(existingUser){
const ispasswordvalid=await bcrypt.compare(password,existingUser.password)
if(ispasswordvalid){
    generateToken(response,existingUser._id)
    return response.status(201).json({_id:existingUser._id,username:existingUser.username,email:existingUser.email,isAdmin:existingUser.isAdmin})
    
}
}
})

const logoutCurrentUser =asyncHandler(async(request,response)=>{
    response.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    response.status(200).json({message:"Logged Out Sucessfully"})
})

const getAllUsers=asyncHandler(async (request,response)=>{
    const users=await User.find({})
    response.json(users)
})

const getCurrentUserProfile=asyncHandler( async (request,response)=>{
    const user=await User.findById(request.user._id)
    if(user){
        response.json({
            _id:user._id,username:user.username,email:user.email
        })
    }
    else{

        response.status(404)
        throw new Error("User not Found")
    }
}
)

const updateCurrentUserProfile=asyncHandler(async(request,response)=>{
    const user=await User.findById(request.user._id)
    if(user){
        user.username=request.body.username || user.username
        user.email=request.body.email || user.email
         user.isAdmin = Boolean(request.body.isAdmin);
        if(request.body.password){
                const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(request.body.password,salt)

            user.password=hashPassword
        }
        const updateUser=await user.save()
        response.json({
            _id:updateUser._id,
            username:updateUser.username,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })
    } else {
        response.status(404)
        throw new Error("User not Found ")
    }
})

const deleteUserbyId=asyncHandler(async(request,response)=>{
    const user=await User.findById(request.params.id)
    if(user){
        if(user.isAdmin){
            response.status(400)
            throw new Error("Cannot delete admin user ")
        }
        await User.deleteOne({_id:user._id})
        response.json({message:"User Removed"})
    }else{
        response.status(404)
        throw new Error('Sorry User can not found')
    }
})

const getUserById=asyncHandler(async(request,response)=>{
    const user=await User.findById(request.params.id).select("-password");
   if(user){
    response.json(user)
   }else{
    response.status(404);
    throw new Error('User not found')
   }
})

const updateUserById=asyncHandler(async(request,response)=>{
    const user=await User.findById(request.params.id)
    if(user){
        user.username=request.body.username || user.username
        user.email=request.body.email ||user
        user.isAdmin=Boolean(request.body.isAdmin)
        const updateduser=await user.save()

        response.json({
            _id:updateduser._id,
            username:updateduser.username,
            email:updateduser.email,
            isAdmin:updateduser.isAdmin
        })
    }else{
        response.status(404);
        throw new Error("User not Found")
    }
})
export {createUser,loginUser,logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserbyId,getUserById,updateUserById }