import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import './App.css';
import { ThemeProvider } from '@mui/joy';
import joyTheme from './joyTheme';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (message) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          answer: data.answer,
          source_documents: data.source_documents,
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to control when SourcesOutput renders
  useEffect(() => {
    console.log('Messages array updated:', messages);
  }, [messages]);

  return (
    <ThemeProvider theme={joyTheme}>
      <CssBaseline />
      <div
        className="app-container"
        style={{
          backgroundColor: joyTheme.colorSchemes.light.palette.primary.background,
        }}
      >
        <div className="chat-layout">
          <div className="left-side">
            <Chat addMessage={addMessage} setMessages={setMessages} messages={messages} />
            <ChatOutput messages={messages} isLoading={isLoading} />
          </div>
          <div className="right-side">
            {/* Pass the source documents to SourcesOutput */}
            <SourcesOutput
              sourceDocuments={messages.flatMap((msg) => msg.source_documents)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;