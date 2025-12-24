import { Box, Button, Typography } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 10 },
          pt: { xs: 6, md: 10 },
          gap: 6,
        }}
      >
        {/* LEFT CONTENT */}
        <Box sx={{ flex: 1 }}>
          <TypingAnim />

          <Typography
            sx={{
              mt: 3,
              fontSize: { xs: "16px", md: "20px" },
              color: "#cbd5f5",
              maxWidth: "520px",
              lineHeight: 1.6,
            }}
          >
            Practice interviews, ask technical questions, and get AI-powered
            feedback using your own MERN-GPT assistant.
          </Typography>

          {/* CTA BUTTONS */}
          <Box sx={{ mt: 5, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                bgcolor: "#00fffc",
                color: "black",
                fontWeight: 700,
                px: 4,
                ":hover": { bgcolor: "#4ff3ff" },
              }}
            >
              Get Started
            </Button>

            <Button
              size="large"
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
              }}
            >
              Live Demo
            </Button>
          </Box>
        </Box>

        {/* RIGHT PREVIEW */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 4,
              p: 2,
              boxShadow: "0 0 80px rgba(0,255,255,0.25)",
            }}
          >
            <img
              src="chat.png"
              alt="chat-preview"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: 16,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

export default Home;
