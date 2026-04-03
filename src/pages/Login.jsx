import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  if (user) {
    navigate("/");
  }
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    email: "sumit@gmail.com",
    password: "Sumit@123",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", formData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
      // console.log(res.data.user);
      toast.success(res.data.msg, {
        position: "bottom-center",
      });
      navigate("/");
      console.log(res);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-87.5 w-full text-center bg-base-300 my-10 mx-auto border border-gray-800 rounded-2xl px-8"
    >
      <h1 className="text-white text-3xl mt-10 font-medium">Login</h1>

      <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

      <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
        <input
          type="email"
          name="email"
          placeholder="Email id"
          className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <p className="text-red-500 text-left my-1">{error}</p>

      {/* <div className="mt-4 text-left">
        <button className="text-sm text-indigo-400 hover:underline">
          Forget password?
        </button>
      </div> */}
      <button
        type="submit"
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition "
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer">
        Don't have an account?
        <span className="text-indigo-400 hover:underline ml-1">
          <Link to="/signup">click here</Link>
        </span>
      </p>
    </form>
  );
};

export default Login;
