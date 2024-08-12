import React, { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/joy/Stack';
import './Chat.css';

const Chat = ({ setMessages, messages, setIsQuestionSubmitted, setCurrentQuestion, setIsLoading, questionFromCard }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const { mode } = useColorScheme();

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    const messageText = input.trim();

    if (messageText) {
      setInput('');
      setIsSubmitting(true);
      setFirstMessageSent(true);
      setIsQuestionSubmitted(true);
      setCurrentQuestion(messageText);

      const newMessage = { text: messageText };
      setMessages([...messages, newMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/process`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: messageText }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { ...newMessage, ...data },
        ]);
      } catch (error) {
        console.error('Error sending the query to the backend:', error);
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (firstMessageSent) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [firstMessageSent]);

  useEffect(() => {
    if (questionFromCard) {
      setInput(questionFromCard);

      const timer = setTimeout(() => {
        handleSubmit();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [questionFromCard]);

  return (
    <Box className="chat" sx={{ bgcolor: 'background.body', padding: 2 }}>
      <Stack spacing={2} className="chat-layout" sx={{ flex: 1, overflowY: 'auto', alignItems: 'center' }} />

      <Box
        component="form"
        className="chat-input-container"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          padding: '8px 16px',
          margin: 0,
        }}
      >
        <Textarea
          className="textarea"
          size="lg"
          placeholder="Stelle eine Frage..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="soft"
          minRows={3}
          maxRows={8}
          sx={{
            flexGrow: 1,
            resize: 'none',
            color: 'text.primary',
            minHeight: '100px',
            backgroundColor: mode === 'light' ? 'background.paper' : 'background.level1',
            border: '1px solid',
            borderColor: 'divider',
            margin: 0,
          }}
        />
        <Button className="button" type="submit" variant="solid" color="neutral" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size="24" /> : <SendIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;