import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text,
      },
    ]);
  };

  return (
    <div className="h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <ChatWindow messages={messages} />

        <ChatInput onSend={handleSend} />

      </div>

    </div>
  );
}