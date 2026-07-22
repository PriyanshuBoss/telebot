import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
} from "./api/chatApi";

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const chats = await getConversations();
    setConversations(chats);

    if (chats.length > 0) {
      await openConversation(chats[0].id);
    }
  };

  const openConversation = async (id) => {
    setCurrentConversation(id);

    const msgs = await getMessages(id);
    setMessages(msgs);
  };

  const handleNewChat = async () => {
    const chat = await createConversation();

    setConversations((prev) => [chat, ...prev]);
    setCurrentConversation(chat.id);
    setMessages([]);
  };

  const handleSend = async (text) => {
    if (!currentConversation || !text.trim()) return;

    // Save message
    await sendMessage(currentConversation, text);

    // Reload messages from backend
    const msgs = await getMessages(currentConversation);
    setMessages(msgs);

    // Reload conversations (title may have changed)
    const chats = await getConversations();
    setConversations(chats);
  };

  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelect={openConversation}
        onNewChat={handleNewChat}
      />

      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}