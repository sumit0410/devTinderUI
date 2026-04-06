import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import toast from "react-hot-toast";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
      if (status === "rejected") {
        toast.error("Request Rejected");
      } else {
        toast.success("Request Accepted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;
  return (
    requests && (
      <div>
        <h1 className="text-center my-6 text-2xl font-bold">Requests</h1>
        <div className="mx-auto">
          {requests.length === 0 ? (
            <p className="text-center">No pending request</p>
          ) : (
            requests.map((request) => {
              const { firstName, lastName, age, photoUrl, gender, about } =
                request.fromUserId;

              return (
                <div
                  className="flex justify-between items-center mx-5 sm:mx-auto bg-base-300 rounded-full border border-gray-800 sm:max-w-1/2 p-4 m-2"
                  key={request._id}
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
                  <div className="flex gap-5">
                    <button
                      className="btn btn-soft rounded-full btn-error"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-soft rounded-full btn-success"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    )
  );
};

export default Requests;
