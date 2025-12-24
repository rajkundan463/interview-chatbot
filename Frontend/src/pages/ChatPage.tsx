import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import {
  questionChatHistory,
  sendUserAnswer,
} from "../helpers/api-communicator";

const ChatPage = () => {
  const { category, questionId } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !questionId) return;

    questionChatHistory(category, questionId).then((data) => {
      setQuestion(data.question);
      setLoading(false);
    });
  }, [category, questionId]);

  if (loading) return <CircularProgress />;

  const submit = async () => {
    await sendUserAnswer(category!, questionId!, question, answer);
    setAnswer("");
  };

  return (
    <Box p={4}>
      <Typography variant="h6">{question}</Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={submit}>
        Submit
      </Button>
    </Box>
  );
};

export default ChatPage;
