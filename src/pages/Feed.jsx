import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((store) => store.user);
  return <div>{user && <h1>{user?.firstName}'s Feed</h1>}</div>;
};

export default Feed;
