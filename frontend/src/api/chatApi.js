import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

export const getConversations = async () => {
  const res = await api.get("/conversations");
  return res.data;
};

export const createConversation = async () => {
  const res = await api.post("/conversations", {
    title: "New Chat",
  });

  return res.data;
};

export const getMessages = async (conversationId) => {
  const res = await api.get(
    `/conversations/${conversationId}/messages`
  );

  return res.data;
};

export const sendMessage = async (
  conversationId,
  message
) => {
  const res = await api.post(
    `/conversations/${conversationId}/messages`,
    {
      sender: "user",
      message,
    }
  );

  return res.data;
};