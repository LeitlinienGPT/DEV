import React, { useState } from 'react';
import './Chat.css';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ addMessage, setMessages, messages }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Input:', input.trim());
    console.log('Backend URL from env:', process.env.REACT_APP_BACKEND_URL);
    const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/process`;
    console.log('Request URL:', requestUrl);
    console.log('Environment variable:', process.env.REACT_APP_BACKEND_URL);

    if (input.trim()) {
      setIsSubmitting(true);
      try {
        console.log('Sending request to:', requestUrl);
        console.log('Sending request body (unformatted):', JSON.stringify({ question: input.trim() }));
        console.log('Sending request body (formatted):', JSON.stringify({ question: input.trim() }, null, 2));

        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input.trim() }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

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
    <Box className="chat" sx={{ bgcolor: 'background.body' }}> 
      <div className="chat-header">
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
            width: '100%',
            color: 'text.primary',
            minWidth: '800px',
            minHeight: '100px'
          }}
        />
        <IconButton type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size="24" /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;