import React, { useState } from 'react';
import './Chat.css';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
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

  const handleClearChat = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clear_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing the chat history:', error);
    }
  };

  return (
    <Box className="chat">
      <div className="chat-header">
        <h1>Demoversion: LeitlinienGPT</h1>
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '10px' }}>
          <p>
            Wir sind <a href="https://www.linkedin.com/in/paolo-oppelt/" target="_blank" rel="noopener noreferrer">Paolo</a>, <a href="https://www.linkedin.com/in/tim-strohmeyer-437a76185/" target="_blank" rel="noopener noreferrer">Tim</a> und <a href="https://www.linkedin.com/in/m-hamm/" target="_blank" rel="noopener noreferrer">Marlon</a>. Mit LeitlinienGPT möchten wir Ärzten dabei helfen, schnell und effizient auf Informationen aus den AWMF-Leitlinien zuzugreifen. Unser Ziel ist es, diese Plattform kontinuierlich auszubauen und weitere wertvolle Quellen einzubinden. Ihr Feedback ist uns dabei besonders wichtig. Kontaktieren Sie uns gerne unter: <a href="mailto:leitliniengpt@gmail.com">leitliniengpt@gmail.com</a>.
          </p>
        </div>
      </div>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between', variant: "soft" }}>
        <Button variant="solid" sx={{ marginY: 2 }} onClick={handleClearChat}>Chat Leeren</Button>
      </Box>

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
            color: 'black',
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