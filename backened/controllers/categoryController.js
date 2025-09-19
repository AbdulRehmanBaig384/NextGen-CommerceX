import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import express from "express";


const createCategory=asyncHandler(async(request,response)=>{
    try{
      const {name}=request.body
      if(!name){
        return response.json({error:'Name is Required'})
      }
      const existingCategory=await Category.findOne({name})
      if(existingCategory){
        return response.json({error:'Already exist'})
      }

      const category =await new Category({name}).save()
      response.json(category)
    }
catch(error){
    console.log(error)
    return response.status(400).json(error)
}})


const updateCategory= asyncHandler(async (request,response)=>{
  try{
    const {name}=request.body
    const {categoryId}=request.params
    const category=await Category.findOne({_id:categoryId})
       if(!category){
        return response.status(404).json({error:'Category not Found '})
       }
       category.name=name
       const updatedCategory=await category.save()
       response.json(updatedCategory)
  }catch(error){
    console.error(error)
    response.status(500).json({error:'Internal server Error'})
  };
},)

const removeCategory=asyncHandler(async(request,response)=>{
  try{
    const removed=await Category.findByIdAndRemove(request.params.category)
    response.json(removed)
  }catch(error){
    console.error(error)
    response.status(500).json({error:'Internal Server Error'})
  }
})
 const listCategory=asyncHandler(async(request,response)=>{
  try{
 const all=await Category.find({})
 response.json(all)
  }catch(error){
    console.log(error)
    response.status(500).json(error.message)
  }
 })

 const readCategory=asyncHandler(async(request,response)=>{
try{  const category=await Category.findOne({_id:request.params.id})
   response.json(category) 
}catch(error){
  console.log(error)
  return response.status(400).json(error.message)
 }
}
)

export  {createCategory,updateCategory,removeCategory,listCategory,readCategory}