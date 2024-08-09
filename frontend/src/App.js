import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import { CssVarsProvider } from '@mui/joy/styles';
import joyTheme from './joyTheme';
import Header from './Header';
import FAQ from './FAQ';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Typography from '@mui/joy/Typography';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Ensure this state controls loading
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const addMessage = async (message) => {
    setIsLoading(true); // Start loading
    setIsQuestionSubmitted(true);
    setCurrentQuestion(message.text);

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
      const updatedMessages = [
        ...messages,
        { text: message.text, ...data }
      ];

      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // End loading
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
                {isQuestionSubmitted && (
                  <>
                    <Typography
                      level="h2"
                      sx={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 'bold', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                    >
                      {currentQuestion}
                    </Typography>
                    <Typography
                      level="h3"
                      sx={{ fontSize: '1.5rem', marginBottom: '0rem', fontWeight: 'bold', paddingLeft: '1.5rem'}}
                    >
                      Quellen
                    </Typography>
                    <SourcesOutput sourceDocuments={messages.flatMap((msg) => msg.source_documents).slice(-3)} isLoading={isLoading} />
                    <ChatOutput messages={messages} isLoading={isLoading} currentQuestion={currentQuestion} />
                  </>
                )}
                <Chat 
                  addMessage={addMessage} 
                  setMessages={setMessages} 
                  messages={messages} 
                  setIsQuestionSubmitted={setIsQuestionSubmitted} 
                  setCurrentQuestion={setCurrentQuestion} 
                  isQuestionSubmitted={isQuestionSubmitted} 
                  setIsLoading={setIsLoading} // Pass setIsLoading here
                />
              </div>
            } />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </CssVarsProvider>
  );
}

export default App;