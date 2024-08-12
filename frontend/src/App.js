import React, { useState, useEffect, useRef } from 'react';
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
import QuestionCard from './QuestionCard';
import AlertVariousStates from './AlertComponent';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const lastQuestionRef = useRef(null);

  const addMessage = async (message) => {
    setIsLoading(true);
    setIsQuestionSubmitted(true); // Set this state when a question is submitted
    setCurrentQuestion(message.text);

    const newMessage = { text: message.text, source_documents: [], answer: 'Loading...' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

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

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, ...data } : msg
        )
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    const message = { text: question };
    addMessage(message);

    setTimeout(() => {
      const inputField = document.querySelector('input');
      if (inputField) {
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        inputField.dispatchEvent(enterEvent);
      }
    }, 1000);
  };

  useEffect(() => {
    console.log('Messages array updated:', messages);

    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
                {!isQuestionSubmitted && (
                  <>
                    <Typography
                      level="h1"
                      sx={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '3rem', fontWeight: 'bold', textAlign: 'center' }}
                    >
                      Demoversion: LeitlinienGPT
                    </Typography>
                    <AlertVariousStates sx={{ marginBottom: 4 }} />
                  </>
                )}
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      ref={index === messages.length - 1 ? lastQuestionRef : null}
                      level="h2"
                      sx={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 'bold', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                    >
                      {msg.text}
                    </Typography>
                    <Typography
                      level="h3"
                      sx={{ fontSize: '1.5rem', marginBottom: '0rem', fontWeight: 'bold', paddingLeft: '1.5rem'}}
                    >
                      Quellen
                    </Typography>
                    <SourcesOutput 
                      sourceDocuments={(msg.source_documents || []).slice(-3)}
                      isLoading={index === messages.length - 1 && isLoading}
                    />
                    <ChatOutput messages={[msg]} isLoading={index === messages.length - 1 && isLoading} currentQuestion={msg.text} />
                  </React.Fragment>
                ))}
                
                <Chat 
                  addMessage={addMessage} 
                  setMessages={setMessages} 
                  messages={messages} 
                  setIsQuestionSubmitted={setIsQuestionSubmitted} 
                  setCurrentQuestion={setCurrentQuestion} 
                  isQuestionSubmitted={isQuestionSubmitted} 
                  setIsLoading={setIsLoading} 
                />
                <QuestionCard onQuestionClick={handleQuestionClick} />
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