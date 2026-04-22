import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const { targetUserId } = useParams();
  const loggedInUserId = user?._id;

  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();

    const isToday = messageDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }

    if (isYesterday) {
      return "Yesterday";
    }

    // Older dates
    return messageDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year:
        messageDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    // console.log(chat.data.messages);

    const messages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        time: formatMessageTime(msg.createdAt),
      };
    });
    setMessages(messages);
    // console.log(messages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(BASE_URL + "/user/" + targetUserId);
      setTargetUser(res?.data?.data);
    };
    console.log(targetUser);
    fetchUser();
  }, [targetUserId]);
  // console.log(targetUser);

  useEffect(() => {
    const container = document.getElementById("chat-container");
    container?.scrollTo(0, container.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      loggedInUserId,
      targetUserId,
      firstName: user.firstName,
    });

    socket.on("messageReceived", ({ firstName, text, time }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text, time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, targetUserId]);

  const sendMessage = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      loggedInUserId,
      targetUserId,
      text: newMessage,
      time,
    });
    setNewMessage("");
  };

  return (
    <div className="flex max-w-xl mx-auto my-10 flex-col h-162 bg-base-300">
      {/* Header */}
      <div className="bg-base-200 shadow p-4 text-lg font-semibold">
        {targetUser && (
          <div className="flex items-center gap-2">
            <img
              src={targetUser.photoUrl}
              className="h-10 w-10 rounded-full"
              alt="userPhoto"
            />
            <p> {targetUser?.firstName + " " + targetUser?.lastName}</p>
          </div>
        )}
      </div>

      {/* Messages */}
      <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex justify-center text-center text-gray-500 h-full items-center my-auto">
            <p>
              <span className="text-4xl">👋🏻</span>
              <br />
              Initiate a chat with <br />{" "}
              <span className="text-2xl">
                {targetUser && targetUser.firstName}!
              </span>
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.firstName === user.firstName ? "items-end" : "items-start"
              }`}
            >
              {/* Name */}
              <span className="text-xs text-gray-500 mb-1">
                {msg.firstName === user.firstName ? "You" : msg.firstName}
              </span>

              {/* Bubble */}
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs wrap-break-words ${
                  msg.firstName === user.firstName
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}
              >
                <p>{msg.text}</p>

                {/* Timestamp */}
                <div className="text-[10px] mt-1 text-right opacity-70">
                  {msg.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="bg-base-200 p-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
