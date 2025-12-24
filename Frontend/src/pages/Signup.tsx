import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      toast.loading("Creating Account", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signup Successful", { id: "signup" });
    } catch {
      toast.error("Signup Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/home2", { replace: true });
    }
  }, [auth?.isLoggedIn, navigate]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      gap={6}
      px={2}
    >
      {/* ROBOT IMAGE */}
      <Box display="flex" justifyContent="center" flex={1}>
        <img
          src="airobot.png"
          alt="AI Robot"
          style={{
            width: "100%",
            maxWidth: "320px",
            opacity: 0.95,
          }}
        />
      </Box>

      {/* SIGNUP FORM */}
      <Box
        flex={1}
        maxWidth="420px"
        width="100%"
        p={4}
        borderRadius={4}
        sx={{
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={3}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <CustomizedInput
            name="name"
            type="text"
            label="Full Name"
          />
          <CustomizedInput
            name="email"
            type="email"
            label="Email"
          />
          <CustomizedInput
            name="password"
            type="password"
            label="Password"
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 700,
              bgcolor: "#00fffc",
              color: "black",
              ":hover": {
                bgcolor: "#4ff3ff",
              },
            }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
