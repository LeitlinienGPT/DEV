import React, { useState, useEffect } from 'react';
import './Chat.css';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/joy/Grid';
import AlertVariousStates from './AlertComponent'; // Ensure this is the correct path

const Chat = ({ addMessage, setMessages, messages, setIsQuestionSubmitted, setCurrentQuestion, isQuestionSubmitted }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      setIsSubmitting(true);
      setIsQuestionSubmitted(true);
      setCurrentQuestion(input.trim());
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/process`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input.trim() }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addMessage({ text: input.trim(), ...data });
        setInput('');
      } catch (error) {
        console.error('Error sending the query to the backend:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (isQuestionSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isQuestionSubmitted]);

  return (
    <Box className="chat" sx={{ bgcolor: 'background.body', padding: 2 }}>
      <div className="chat-header" style={{ paddingTop: '64px' }}>
        <h1 style={{ color: 'text.primary' }}>Demoversion: LeitlinienGPT</h1>
      </div>

      <AlertVariousStates sx={{ marginBottom: 4 }} /> {/* Add margin-bottom to the alert component */}

      {isQuestionSubmitted && (
        <Box component="form" className="chat-input-container" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
          <Textarea
            size="lg"
            placeholder="Schreibe eine Nachricht..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="soft"
            minRows={3}
            maxRows={8}
            sx={{
              flexGrow: 1,
              resize: 'none',
              color: 'text.primary',
              minHeight: '100px'
            }}
          />
          <Button type="submit" variant="outlined" color="primary" loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size="24" /> : <SendIcon />}
          </Button>
        </Box>
      )}

      {!isQuestionSubmitted && (
        <Grid container justifyContent="center" sx={{ position: 'fixed', bottom: 0, width: '100%', bgcolor: 'background.body', padding: 2 }}>
          <Grid item xs={12} sm={8} md={6} component="form" className="chat-input-container" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <Textarea
              size="lg"
              placeholder="Schreibe eine Nachricht..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="soft"
              minRows={3}
              maxRows={8}
              sx={{
                flexGrow: 1,
                resize: 'none',
                color: 'text.primary',
                minHeight: '100px'
              }}
            />
            <Button type="submit" variant="outlined" color="primary" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size="24" /> : <SendIcon />}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Chat;