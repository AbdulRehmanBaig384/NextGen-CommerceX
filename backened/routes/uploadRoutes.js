import path from 'path'
// import express, { response } from 'express'
import multer from 'multer'
import express from 'express'
const router=express.Router()
const storage=multer.diskStorage({
    destination:(request,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(request,file,cb)=>{
        const extname=path.extname(file.originalname)
        cb(null,`${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter=(request,file,cb)=>{
    const filetypes=/jpe?g|png|webp/;
    const mimetypes=/image\/jpe?g|image\/png|image\/webp/;
    const extname=path.extname(file.originalname).toLowerCase()
    const mimetype=file.mimetype
    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Images only'),false)
    }}

    const upload=multer({storage,fileFilter})
    const uploadSingleImage=upload.single('image')

router.post('/',(request,response)=>{
    uploadSingleImage(request,response,(error)=>{
        if(error){
            response.status(400).send({message:error.message})
        } else if(request.file){
            response.status(200).send({
                message:'Image Upload Sucessfully',
                image:`/${request.file.path}`
            })
        }else{
            response.status(400).send({message:'No image file Provided'})
        }
    })
    // response.send('hello')
})

export default router