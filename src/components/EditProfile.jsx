import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, age, about, gender, photoUrl } = user;
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    photoUrl: photoUrl,
    age: age,
    about: about,
    gender: gender,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success(res.data.msg);
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      console.log("error: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center my-10 gap-5">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full pb-6 text-center bg-base-300 my-10 border border-gray-800 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">Profile</h1>

        <p className="text-gray-400 text-sm mt-2">Edit or save profile</p>

        <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <input
            type="text"
            name="firstName"
            placeholder="firstname"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <input
            type="text"
            name="lastName"
            placeholder="lastname"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <input
            type="text"
            name="photoUrl"
            placeholder="photo url"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            required
            value={formData.photoUrl}
            onChange={handleChange}
          />
        </div>
        <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <input
            type="text"
            name="age"
            placeholder="age"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            required
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className=" flex items-center mt-4 bg-gray-800 border border-gray-700 h-12 w-full rounded-full overflow-hidden pl-6 gap-2 ">
          <input
            type="text"
            name="about"
            placeholder="bio"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            required
            value={formData.about}
            onChange={handleChange}
          />
        </div>
        <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <select
            type="text"
            name="gender"
            placeholder="select gender"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition "
          onClick={handleEditProfile}
        >
          Save Profile
        </button>
      </form>
      <UserCard user={formData} />
    </div>
  );
};

export default EditProfile;
