import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
// submitForm inputData
function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userID form params: ", id);
    try {
      axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {
        console.log("API response: ", response.data);
        setUser(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("Error while fetching your data");
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/user/${id}`,
        user
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
        alert("Error whle updating your data")
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <Link
        to="/"
        type="button"
        className="bg-purple-600 hover:bg-purple-400 px-4 py-2 rounded-full text-white font-bold"
      >
        Back
      </Link>
      <h3 className="font-bold text-xl"> Edit User</h3>
      <form
        className="border-black border-2 rounded-xl py-4 px-2 flex flex-col gap-4 items-center"
        onSubmit={submitForm}
      >
        <div className="flex gap-4">
          <label
            className="text-start placeholder:border-2 placeholder:border-black text-md font-semibold"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={user.name}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-start text-md font-semibold" htmlFor="email">
            Email:
          </label>

          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            placeholder="Enter your email"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-md font-semibold" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={user.address}
            placeholder="Enter your Address"
          />
        </div>
        <div>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
