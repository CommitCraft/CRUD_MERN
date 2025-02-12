import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./User.css";
function User() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        const data = fetchData();
    }, []);

    const deleteUser = async (userId) => {
        axios
            .delete(`http://localhost:8000/api/delete/user/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success(response.data.message, { position: "top-right" });
                alert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center gap-5">
            <Link to="/add" className="btn btn-primary">
                <button className='bg-purple-600 px-4 py-2 rounded-full text-white font-bold'>    Add User</button>

            </Link>
            <table className='border-2 border-black border-spacing-8'>
                <thead className='bg-[#9333ea]  text-white'>
                    <tr className=''>
                        <th className='border-2 border-black '>ID</th>
                        <th className='border-2 border-black '>Name</th>
                        <th className='border-2 border-black '>Email</th>
                        <th className='border-2 border-black '>Address</th>
                        <th className='border-2 border-black '>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {users.map((user, index) => {
                        return (
                            <tr className=''>
                                <td className='px-2 border-2 border-black '>{index + 1}</td>
                                <td className='px-2 border-2 border-black '>{user.name}</td>
                                <td className='px-2 border-2 border-black '>{user.email}</td>
                                <td className='px-2 border-2 border-black '>{user.address}</td>
                                <td className='px-2 border boder-black flex gap-4 '><Link to={`/editUser/${user._id}`} className="btn btn-primary">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
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