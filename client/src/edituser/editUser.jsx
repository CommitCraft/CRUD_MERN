import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddUser() {
    const users = {
        name: "",
        email: "",
        address:"",
    }
    const [user,setUser] =useState(users)
    const navigate = useNavigate();

    const inputData =(e)=>{
        const {name, value} = e.target;
        console.log(name, value);

        setUser({...user,[name]:value});
        
    }
    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user",user)
        .then((response)=>{
            alert(response.data.message);
            navigate("/")
        })
        .catch((error)=>{
            console.log(error);       
        })
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-2'>
        <Link to="/" type='button' className='bg-purple-600 hover:bg-purple-400 px-4 py-2 rounded-full text-white font-bold'>
            Back
        </Link>
        <h3 className='font-bold text-xl'> Edit User</h3>
        <form className='border-black border-2 rounded-xl py-4 px-2 flex flex-col gap-4 items-center' onSubmit={submitForm}>
            <div className='flex gap-4'>
                <label className='text-start  placeholder:border-2 placeholder:border-black text-md font-semibold' htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' onChange={inputData} placeholder='Enter your name' />
            </div>
            <div className='flex gap-4'>
                <label className='text-start text-md font-semibold' htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' onChange={inputData} placeholder='Enter your email' />
            </div>
            <div className='flex gap-4'>
                <label className='text-md font-semibold' htmlFor='address'>Address:</label>
                <input type='text' id='address' name='address' onChange={inputData} placeholder='Enter your Address' />
            </div>
            <div>
                <button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser