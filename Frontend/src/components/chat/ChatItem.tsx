import { Box, Typography } from "@mui/material";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const ChatItem = ({ role, content }: Props) => {
  return (
    <Box
      sx={{
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        backgroundColor: role === "user" ? "#00fffc" : "#2c2c2c",
        color: role === "user" ? "black" : "white",
        p: 2,
        borderRadius: 2,
        mb: 1,
        maxWidth: "70%",
      }}
    >
      <Typography>{content}</Typography>
    </Box>
  );
};

export default ChatItem;
