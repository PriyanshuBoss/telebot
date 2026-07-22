import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
} from "../api/chatApi";

export default function Chat() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const loadConversations = async () => {
    try {
      const chats = await getConversations();
      setConversations(chats);

      if (chats.length > 0) {
        openConversation(chats[0].id);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    }
  };

  const openConversation = async (id) => {
    try {
      setCurrentConversation(id);

      const msgs = await getMessages(id);
      setMessages(msgs);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    }
  };

  const handleNewChat = async () => {
    try {
      const chat = await createConversation();

      setConversations((prev) => [chat, ...prev]);
      setCurrentConversation(chat.id);
      setMessages([]);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    }
  };

  const handleSend = async (text) => {
    if (!currentConversation || !text.trim()) return;

    try {
      await sendMessage(currentConversation, text);

      const msgs = await getMessages(currentConversation);
      setMessages(msgs);

      const chats = await getConversations();
      setConversations(chats);
    } catch (err) {
      console.error(err);
      if (err.response?.status ===401) logout();
    }
  };

  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelect={openConversation}
        onNewChat={handleNewChat}
        onLogout={logout}
      />

      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}