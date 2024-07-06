import React, { useState } from 'react';
import './Chat.css';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';

const Chat = ({ addMessage, setMessages, messages, setIsQuestionSubmitted, setCurrentQuestion }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      setIsSubmitting(true);
      setIsQuestionSubmitted(true); // Set question submitted state
      setCurrentQuestion(input.trim()); // Set the current question directly
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

  return (
    <Box className="chat" sx={{ bgcolor: 'background.body', padding: 2 }}>
      <div className="chat-header" style={{ paddingTop: '64px' }}> {/* Adjust padding top */}
        <h1 style={{ color: 'text.primary' }}>Demoversion: LeitlinienGPT</h1>
      </div>

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
    </Box>
  );
};

export default Chat;