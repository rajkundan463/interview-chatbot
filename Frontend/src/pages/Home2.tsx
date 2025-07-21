import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home2 = () => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    navigate(`/questions/${category}`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      <Button variant="contained" onClick={() => handleClick("DSA")}>
        DSA
      </Button>
      <Button variant="contained" onClick={() => handleClick("DBMS")}>
        DBMS
      </Button>
      <Button variant="contained" onClick={() => handleClick("OOPS")}>
        OOPS
      </Button>
    </Box>
  );
};

export default Home2;
