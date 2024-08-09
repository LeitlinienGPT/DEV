// Chat.js: This handles the input form where the user types their question. 
// It manages the form submission and state changes when a new question is asked.

import React, { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/joy/Stack';
import AlertVariousStates from './AlertComponent';
import './Chat.css';

const Chat = ({ setMessages, messages, setIsQuestionSubmitted, setCurrentQuestion, setIsLoading }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const { mode } = useColorScheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      setIsSubmitting(true);
      setIsQuestionSubmitted(true);
      setCurrentQuestion(input.trim());
      setFirstMessageSent(true);
      setIsLoading(true); // Set loading state to true
  
      // Append new message without clearing
      const newMessage = { text: input.trim(), answer: 'Lädt Antwort...' };
      setMessages([...messages, newMessage]);
  
      setInput('');
  
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
  
        // Append the new data to messages
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // remove the last placeholder message
          { ...newMessage, ...data }
        ]);
      } catch (error) {
        console.error('Error sending the query to the backend:', error);
      } finally {
        setIsSubmitting(false);
        setIsLoading(false); // Set loading state to false when the request is complete
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

  return (
    <Box className="chat" sx={{ bgcolor: 'background.body', padding: 2 }}>
      {!firstMessageSent && (
        <div className="chat-header" style={{ paddingTop: '64px', textAlign: 'center' }}>
          <h1 style={{ color: 'text.primary' }}>Demoversion: LeitlinienGPT</h1>
          <AlertVariousStates sx={{ marginBottom: 4 }} />
        </div>
      )}

      <Stack spacing={2} className="chat-layout" sx={{ flex: 1, overflowY: 'auto', alignItems: 'center' }}>
        {/* Remove the message rendering from here */}
      </Stack>

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