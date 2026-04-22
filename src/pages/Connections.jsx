import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return;
  return (
    connections && (
      <div>
        <h1 className="text-center my-6 text-2xl font-bold">
          Your Connections
        </h1>
        <div className=" mx-auto">
          {connections.length === 0 ? (
            <p className="text-center">No connections found</p>
          ) : (
            connections.map((connection) => {
              const { _id, firstName, lastName, age, photoUrl, gender, about } =
                connection;

              return (
                <div
                  className="flex items-center justify-between sm:px-10 mx-5 sm:mx-auto bg-base-300 rounded-sm border border-gray-800 sm:max-w-1/2 p-4 m-2"
                  key={connection._id}
                >
                  <div className="flex">
                    <img
                      className="rounded-full w-14 h-14"
                      src={photoUrl}
                      alt="user photo"
                    />
                    <div className="text-sm mx-5">
                      <div>{firstName + " " + lastName}</div>
                      {age && gender && <p>{age + ", " + gender}</p>}
                      <p>{about}</p>
                    </div>
                  </div>
                  <Link to={`/chat/${_id}`}>
                    {" "}
                    <button className="btn btn-primary">Chat</button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    )
  );
};

export default Connections;
