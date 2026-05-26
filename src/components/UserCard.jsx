import axios from "../utils/axiosInstance";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, gender, skills, photoUrl } =
    user;
  console.log(user);
  const dispatch = useDispatch();
  const sendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="rounded-2xl max-w-2xl h-[80vh] sm:mx-auto my-10 mx-8 overflow-hidden">
      <div className="h-30 bg-gradient-to-r from-indigo-500 to-purple-500" />

      <CardContent className="relative pt-0">
        <Avatar className="w-32 h-32 border-4 border-background -mt-16">
          <AvatarImage src={photoUrl} />
        </Avatar>

        <div className="mt-4">
          <h2 className="text-2xl font-bold">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p>
              {age + " | " + gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}

          <p className="text-muted-foreground mt-2">{about}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills &&
              skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-secondary text-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
          <div className=" flex gap-2 my-6 justify-end">
            <Button onClick={() => sendRequest("ignored", _id)}>Ignore</Button>
            <Button
              variant="outline"
              onClick={() => sendRequest("interested", _id)}
            >
              Interested
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
