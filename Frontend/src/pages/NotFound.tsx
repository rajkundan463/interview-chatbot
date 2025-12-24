import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3">404</Typography>
      <Typography>Page Not Found</Typography>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </Box>
  );
};

export default NotFound;
