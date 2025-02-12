import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import  toast from 'react-hot-toast';
function User() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);           
            }
        }
       const data = fetchData();   
    },[]);

    const deleteUser = async(userId) =>{
        axios
        .delete(`http://localhost:8000/api/delete/user/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));
            toast.success(response.data.message,{position: "top-right"});
            alert(response.data.message);
        })
        .catch((error)=>{
            console.log(error);     
        });
    };
   
  return (
    <div className="userTable">
    <Link to="/add" className="btn btn-primary">
    Add User
    </Link>
    <table className='table table-bordered'>
    <thead>
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
        {users.map((user,index)=>{
            return (
            <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td><Link to="/editUser/1" className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger" onClick={()=>deleteUser(user._id)}>Delete</button>
                </td>
            </tr>
            )
        })}
    </tbody>
    </table>
    </div>
  )
}

export default User