import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import { CssVarsProvider } from '@mui/joy/styles'; // Ensure this is imported correctly
import joyTheme from './joyTheme';
import Header from './Header';
import About from './About';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

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
          text: message.text,
          answer: data.answer,
          source_documents: data.source_documents,
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Messages array updated:', messages);
  }, [messages]);

  return (
    <CssVarsProvider theme={joyTheme}>
      <CssBaseline />
      <Header />
      <ErrorBoundary>
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <div className="chat-layout"> 
                <Chat addMessage={addMessage} setMessages={setMessages} messages={messages} className="grid-card" />
                <ChatOutput messages={messages} isLoading={isLoading} className="grid-card" />
                <SourcesOutput sourceDocuments={messages.flatMap((msg) => msg.source_documents)} isLoading={isLoading} className="grid-card" />
              </div>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </CssVarsProvider>
  );
}

export default App;