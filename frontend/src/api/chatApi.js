import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

/* --------------------------
   Conversation APIs
--------------------------- */

export const getConversations = async () => {
  const { data } = await api.get("/conversations/");
  return data;
};

export const createConversation = async () => {
  const { data } = await api.post("/conversations/");
  return data;
};

export const getConversation = async (conversationId) => {
  const { data } = await api.get(`/conversations/${conversationId}/`);
  return data;
};

export const deleteConversation = async (conversationId) => {
  await api.delete(`/conversations/${conversationId}/`);
};

/* --------------------------
   Message APIs
--------------------------- */

export const getMessages = async (conversationId) => {
  const { data } = await api.get(
    `/conversations/${conversationId}/messages/`
  );

  return data;
};

export const sendMessage = async (
  conversationId,
  message
) => {
  const { data } = await api.post(
    `/conversations/${conversationId}/messages/`,
    {
      message,
    }
  );

  return data;
};