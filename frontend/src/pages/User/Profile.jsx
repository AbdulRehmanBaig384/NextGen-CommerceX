import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
  import { setCredientials } from '../../redux/featured/auth/authSlice'
  import { Link } from 'react-router'
  import { useProfileMutation } from '../../redux/api/userApiSlice'
const Profile = () => {
    const [username,setUserName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const {userInfo}=useSelector(state=>state.auth)
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()
    useEffect(()=>{
        setUserName(userInfo.username)
        setEmail(userInfo.email)

    },[userInfo.email,userInfo.username])

    const dispatch=useDispatch();
    const submitHandler=async(e)=>{
      e.preventDefault()
      if(password !==confirmPassword){
        toast.error('Password do not match')
      }else{
        try{
           const res=await updateProfile({_id:userInfo._id,username,email,password}).unwrap()
           dispatch(setCredientials({...res}))
           toast.success("Profile updated Sucessfully")
        }catch(error){
          toast.error(error?.data?.message || error.message )
        }
      }

    }
  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
          <div className="md:w-1/3">
          <h1 className='text-2xl font-semibold mb-4'>Update Profile</h1>

            <form onSubmit={submitHandler}>
                <div className='mb-4'>
                    <label className='block text-white mb-2'>Name</label>
                    <input type='text' placeholder='Enter Name' className='form-input p-4 rounded-sm w-full  text-black bg-white ' value={username} onChange={(e)=>setUserName(e.target.value)}/>

                </div>
                 <div className='mb-4'>
                    <label className='block text-white mb-2'>Email</label>
                    <input type='text' placeholder='Enter Email' className='form-input p-4 rounded-sm w-full text-black bg-white ' value={email} onChange={(e)=>setEmail(e.target.value)}/>

                </div>
                 <div className='mb-4'>
                    <label className='block text-white mb-2'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-input p-4 rounded-sm w-full  text-black bg-white' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                </div>
                 <div className='mb-4'>
                    <label className='block text-white mb-2'>Confirm Password</label>
                    <input type='password' placeholder='Enter Confirmed' className='form-input p-4 rounded-sm w-full text-black bg-white ' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

                </div>
                <div className="flex justify-between">
                  <button type='submit' className='bg-pink-600 text-white py-2 px-4 hover:bg-pink-800 rounded'>Update</button>
                  <Link to='/user-orders' className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-800'>My Orders</Link>
                </div>
            </form>
          </div>
          {loadingUpdateProfile && <Loader/> }
         
        </div>
        
    </div>
  )
}

export default Profile
