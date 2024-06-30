import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import './App.css';
import { ThemeProvider } from '@mui/joy';
import joyTheme from './joyTheme'; // Ensure this is the correct path to your theme file

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (message) => {
    // 1. Update the state immediately with the new message
    setMessages(prevMessages => [...prevMessages, message]);
  
    // 2. Start loading state
    setIsLoading(true);
  
    try {
      // 3. Make the API call to your Flask backend
      const response = await fetch('/process', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: message.question }) // Assuming message has a 'question' property
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      // 4. Update the message object with the response data
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          answer: data.answer, // Assuming your API returns 'answer'
          source_documents: data.source_documents // Assuming your API returns 'source_documents'
        };
        return updatedMessages;
      });
  
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error appropriately (e.g., display an error message)
    } finally {
      // 5. Stop loading state
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={joyTheme}> {/* Wrap your app with ThemeProvider */}
      <CssBaseline />
      <div className="app-container" style={{ backgroundColor: joyTheme.colorSchemes.light.palette.primary.background }}>
        <div className="chat-layout">
          <div className="left-side">
            <Chat addMessage={addMessage} setMessages={setMessages} messages={messages}/>
            <ChatOutput messages={messages} isLoading={isLoading} /> {/* Pass isLoading to ChatOutput */}
          </div>
          <div className="right-side">
            <SourcesOutput sourceDocuments={messages.map(msg => msg.source_documents).flat()} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
