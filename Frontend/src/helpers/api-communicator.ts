import api from "./axios";

/* ================= AUTH ================= */

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  return res.data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/user/signup", { name, email, password });
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await api.get("/user/auth-status");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  return res.data;
};

/* ================= QUESTIONS ================= */

export const getQuestions = async (category: string) => {
  const res = await api.get(`/questions/${category}`);
  return res.data;
};

export const getAllQuestions = async () => {
  const res = await api.get("/questions/get");
  return res.data;
};

export const addQuestion = async (question: string, category: string) => {
  const res = await api.post("/questions/add", { question, category });
  return res.data;
};

export const updateQuestion = async (id: string, text: string) => {
  const res = await api.put(`/questions/update/${id}`, { text });
  return res.data;
};

export const deleteQuestion = async (id: string) => {
  const res = await api.delete(`/questions/delete/${id}`);
  return res.data;
};

/* ================= CHAT ================= */

export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat", { message });
  return res.data;
};

export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  return res.data;
};

export const questionChatHistory = async (
  category: string,
  questionId: string
) => {
  const res = await api.get(`/chat/all-chats/${category}/${questionId}`);
  return res.data;
};

export const sendUserAnswer = async (
  category: string,
  questionId: string,
  question: string,
  answer: string
) => {
  const res = await api.post(`/chat/${category}/${questionId}`, {
    question,
    message: answer.trim(),
  });
  return res.data;
};
