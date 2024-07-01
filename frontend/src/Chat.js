import React, { useState } from 'react';
import './Chat.css';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
// import Select from '@mui/joy/Select'; // Commented out Select import
// import Option from '@mui/joy/Option'; // Commented out Option import
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loading indicator

const Chat = ({ addMessage, setMessages, messages }) => {
  const [input, setInput] = useState('');
  // const [dropdownValue, setDropdownValue] = useState(''); // Commented out dropdown state
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track if a request is being processed

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Input:', input.trim());
  
    // Log the environment variable
    console.log('Backend URL from env:', process.env.REACT_APP_BACKEND_URL);
  
    // Construct the URL and log it
    console.log('Backend URL from env:', process.env.REACT_APP_BACKEND_URL);
    const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/process`;
    console.log('Request URL:', requestUrl);
    console.log('Environment variable:', process.env.REACT_APP_BACKEND_URL);
  
    if (input.trim()) {
      setIsSubmitting(true);
      try {
        // Log before sending the request
        console.log('Sending request to:', requestUrl);

        // Log the body before sending the request (unformatted)
        console.log('Sending request body (unformatted):', JSON.stringify({ question: input.trim() }));

        // Log the body before sending the request (formatted)
        console.log('Sending request body (formatted):', JSON.stringify({ question: input.trim() }, null, 2));
  
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Sending as JSON
          },
          body: JSON.stringify({ question: input.trim() }), // JSON body
        });
  
        // Log the HTTP response status
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Log the received data
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
      console.log(data.message); // "History cleared"
  
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

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between', variant: "soft"}}>
        <Button variant="solid" sx={{ marginY: 2 }} onClick={handleClearChat}>Chat Leeren</Button>
      </Box>

      <Box component="form" className="chat-input-container" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <Textarea
          size="lg"
          placeholder="Schreibe eine Nachricht..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="soft"
          minRows={2}
          maxRows={6}
          sx={{
            flexGrow: 1,
            resize: 'none',
            width: '100%',
            color: 'black',
          }}
        />
        <Button type="submit" variant="solid" size="md" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Senden'}
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;