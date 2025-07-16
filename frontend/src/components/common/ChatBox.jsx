import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Input from "./Input";

const SOCKET_URL = "http://localhost:5001"; // Change if your backend runs elsewhere

export default function ChatBox({ roomId, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    // Join the room
    socketRef.current.emit("join", { room: roomId, user: username });

    // Listen for messages
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.emit("leave", { room: roomId, user: username });
      socketRef.current.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socketRef.current.emit("chat", {
      room: roomId,
      user: username,
      text: input,
    });
    setInput("");
  };

  return (
    <div className="w-full max-w-md bg-black rounded shadow p-4 mt-6">
      <div className="h-48 overflow-y-auto mb-2 border-b">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="font-bold">{msg.user}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <Input
          className="rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
