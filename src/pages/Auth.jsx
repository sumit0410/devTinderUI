import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "../utils/firebase";

const AuthDialog = () => {
  const [isLogin, setIsLogin] = useState(true);

  //sign up....
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        { ...signUpData },
        { withCredentials: true },
      );
      // console.log(res.data.data);
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      //   console.log(error);

      if (error.response?.data) {
        setError(error.response.data);
      } else {
        setError("Something went wrong");
      }
    }
  };

  //login....
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);
  const [loginData, setLoginData] = React.useState({
    email: "sumit@gmail.com",
    password: "Sumit@123",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", loginData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
      // console.log(res.data.user);
      toast.success(res.data.msg, {
        position: "top-center",
      });
      navigate("/feed");
      console.log(res);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Something went wrong");
      }
    }
  };

  // google login.....
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log(user);
      const res = await axios.post(
        BASE_URL + "/auth/google/login",
        {
          email: user.email,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.user));
      toast.success(res.data.msg, {
        position: "top-center",
      });
      navigate("/feed");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.msg);
      }
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log(user);
      const res = await axios.post(
        BASE_URL + "/auth/google/signup",
        {
          name: user.displayName,
          email: user.email,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.msg);
      }
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className=" text-base rounded-full px-4 py-2">
          Get Started
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden border-none p-0 rounded-3xl">
        <div className="grid md:grid-cols-1">
          <div className="p-8 sm:p-10">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-3xl font-bold">
                {isLogin ? "Welcome back" : "Create account"}
              </DialogTitle>

              <DialogDescription>
                {isLogin
                  ? "Login to continue your developer journey."
                  : "Join the developer community today."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    onChange={handleSignUpChange}
                    className="h-11 rounded-xl"
                    placeholder="First Name"
                    name="firstName"
                    value={signUpData.firstName}
                  />

                  <Input
                    name="lastName"
                    value={signUpData.lastName}
                    onChange={handleSignUpChange}
                    className="h-11 rounded-xl"
                    placeholder="Last Name"
                  />
                </div>
              )}

              <Input
                type="email"
                placeholder="Email address"
                className="h-11 rounded-xl"
                name="email"
                value={isLogin ? loginData.email : signUpData.email}
                onChange={isLogin ? handleLoginChange : handleSignUpChange}
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="h-11 rounded-xl"
                value={isLogin ? loginData.password : signUpData.password}
                onChange={isLogin ? handleLoginChange : handleSignUpChange}
              />
              <p className="text-red-500 text-left my-1">{error}</p>

              <Button
                onClick={isLogin ? handleLogin : handleSignUp}
                className="w-full h-11 rounded-xl mt-2"
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </div>
            <p className="text-center py-2 ">or</p>
            <div>
              <Button
                variant="outline"
                className="w-full"
                onClick={isLogin ? handleGoogleLogin : handleGoogleSignup}
              >
                Countinue with Google
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => {
                      setError("");
                      setIsLogin(false);
                    }}
                    className="font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setError("");
                      setIsLogin(true);
                    }}
                    className="font-medium hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
