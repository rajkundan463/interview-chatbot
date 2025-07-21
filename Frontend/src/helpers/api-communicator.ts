import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  console.log(data);
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const getAllQuestions = async () => {
  const res = await axios.get("/questions/get");
  if (res.status !== 200) {
    throw new Error("Unable to fetch questions");
  }
  return res.data;
};

export const getQuestions = async (category: string) => {
  const res = await axios.get(`/questions/${category}`);
  if (res.status !== 200) {
    throw new Error("Unable to fetch questions");
  }
  return res.data;
};


export const addQuestion = async (question: string, category: string) => {
  console.log("Adding question:", question, "to category:", category);
  const res = await axios.post("/questions/add", {
    question,
    category,
  });
  if (res.status !== 201 && res.status !== 200) {
    throw new Error("Unable to add question");
  }
  return res.data;
};

export const updateQuestion = async (id: string, updatedText: string) => {
  const res = await axios.put(`/questions/update/${id}`, {
    text: updatedText,
  });
  if (res.status !== 200) {
    throw new Error("Unable to update question");
  }
  return res.data;
};

export const deleteQuestion = async (id: string) => {
  const res = await axios.delete(`/questions/delete/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to delete question");
  }
  return res.data;
};

export const questionChatHistory = async(category:string, question_id:string) =>{
  const res = await axios.get(`/chat/all-chats/${category}/${question_id}`);
  if (res.status !== 200) {
    throw new Error("Unable to get question history");
  }
  return res.data;
}

export const sendUserAnswer = async(category:string, question_id:string, question:string, user_answer:string) =>{
  const res = await axios.post(`/chat/${category}/${question_id}`,{
      question,
      message:user_answer.trim()
    });
  if (res.status !== 200) {
    throw new Error("Unable to submit answer");
  }
  return res.data;
}