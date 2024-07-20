import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import { CssVarsProvider } from '@mui/joy/styles'; // Ensure this is imported correctly
import joyTheme from './joyTheme';
import Header from './Header';
import About from './About';
import FAQ from './FAQ'; // Import the new FAQ component
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false); // New state
  const [currentQuestion, setCurrentQuestion] = useState(''); // New state for current question

  const addMessage = async (message) => {
    setIsLoading(true);
    setIsQuestionSubmitted(true); // Set question submitted state
    setCurrentQuestion(message.text); // Set the current question

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
      
      // Update the messages with the new message and its sources
      const updatedMessages = [
        ...messages,
        { text: message.text, ...data }
      ];

      // Limit the sourceDocuments to the three most recent sources
      const updatedSourceDocuments = updatedMessages.flatMap(msg => msg.source_documents).slice(-3);

      // Update the state with the new messages and limited sources
      setMessages(updatedMessages);
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
                <Chat addMessage={addMessage} setMessages={setMessages} messages={messages} setIsQuestionSubmitted={setIsQuestionSubmitted} setCurrentQuestion={setCurrentQuestion} isQuestionSubmitted={isQuestionSubmitted} className="grid-card" />
                {isQuestionSubmitted && (
                  <>
                    <ChatOutput messages={messages} isLoading={isLoading} currentQuestion={currentQuestion} className="grid-card" />
                    <SourcesOutput sourceDocuments={messages.flatMap((msg) => msg.source_documents).slice(-3)} isLoading={isLoading} className="grid-card" />
                  </>
                )}
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} /> {/* Added FAQ route */}
          </Routes>
        </div>
      </ErrorBoundary>
    </CssVarsProvider>
  );
}

export default App;