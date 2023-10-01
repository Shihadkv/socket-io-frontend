import "tailwindcss/tailwind.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="bg-blue-200 p-4 rounded-lg shadow-lg">
      <input
        className="mb-2 border border-gray-300 rounded-md p-2"
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={sendMessage}
      >
        Send Message
      </button>
      <h1 className="text-xl mt-4">Message:</h1>
      {messageReceived}
    </div>
  </div>
  );
}

export default App;
