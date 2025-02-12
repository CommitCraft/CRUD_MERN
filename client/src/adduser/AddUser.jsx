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
    <div className='addUser'>
        <Link to="/" type='button' className='btn'>
            Back
        </Link>
        <h3> Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' onChange={inputData} placeholder='Enter your name' />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' onChange={inputData} placeholder='Enter your email' />
            </div>
            <div>
                <label htmlFor='address'>Address:</label>
                <input type='text' id='address' name='address' onChange={inputData} placeholder='Enter your Address' />
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser