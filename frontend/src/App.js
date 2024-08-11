import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { Routes, Route } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Chat from './Chat';
import ChatOutput from './ChatOutput';
import SourcesOutput from './SourcesOutput';
import Header from './Header';
import FAQ from './FAQ';
import ErrorBoundary from './ErrorBoundary';
import joyTheme from './joyTheme';
import QuestionCard from './QuestionCard';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  
  // Ref to track the last question's title
  const lastQuestionRef = useRef(null);

  const addMessage = async (message) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Messages array updated:', messages);
    
    // Scroll to the last question's title after messages update
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleQuestionClick = (question) => {
    // Clear the current question and simulate user input
    setCurrentQuestion(question);
  };

  return (
    <CssVarsProvider theme={joyTheme}>
      <CssBaseline />
      <Header />
      <ErrorBoundary>
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <div className="chat-layout">
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      ref={index === messages.length - 1 ? lastQuestionRef : null}  // Assign ref to the last question
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
                    <SourcesOutput sourceDocuments={msg.source_documents} isLoading={isLoading} />
                    <ChatOutput messages={[msg]} isLoading={isLoading} currentQuestion={msg.text} />
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
                  questionFromCard={currentQuestion} // Pass the current question to the Chat component
                />
                <QuestionCard onQuestionClick={handleQuestionClick} /> {/* Pass the handler to the QuestionCard */}
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