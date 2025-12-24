import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home2 from "./pages/Home2";
import QuestionsPage from "./pages/QuestionsPageUser";
import ChatPage from "./pages/ChatPage";
import AdminHome from "./pages/QuestionPageAdmin";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth?.isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const auth = useAuth();
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={auth?.isLoggedIn ? <Navigate to="/home2" /> : <Login />}
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home2"
          element={
            <ProtectedRoute>
              {auth?.user?.role === "admin" ? (
                <AdminHome />
              ) : (
                <Home2 />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:category"
          element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatpage/:category/:questionId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
