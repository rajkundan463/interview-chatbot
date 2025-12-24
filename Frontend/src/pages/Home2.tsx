import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home2 = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const categories = ["DSA", "DBMS", "OOPS", "OS" , "CN"];

  return (
    <Box
      minHeight="70vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Typography variant="h4" fontWeight={700}>
        {auth?.user?.role === "admin"
          ? "Admin Dashboard"
          : "Choose a Topic"}
      </Typography>

      {auth?.user?.role === "admin" ? (
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/admin")}
        >
          Manage Questions
        </Button>
      ) : (
        categories.map((cat) => (
          <Button
            key={cat}
            variant="contained"
            size="large"
            onClick={() => navigate(`/questions/${cat}`)}
          >
            {cat}
          </Button>
        ))
      )}
    </Box>
  );
};

export default Home2;
