import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/QuestionPageAdmin";
import { useAuth } from "./context/AuthContext";
import Home2 from "./pages/Home2";
import QuestionsPage from "./pages/QuestionsPageUser";
import ChatPage from "./pages/ChatPage";

// Define the User interface
interface User {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

// Main App component
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions/:category" element={<QuestionsPage />} />
        <Route path="/chatpage/:category/:questionId" element={<ChatPage />} />

        {auth?.isLoggedIn && auth.user && (
          <Route
            path="/home2"
            element={
              (auth.user as User).role === "admin" ? (
                <AdminHome />
              ) : (
                <Home2 />
              )
            }
          />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
