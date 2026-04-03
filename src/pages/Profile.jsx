import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && <EditProfile user={user} />;
};

export default Profile;
