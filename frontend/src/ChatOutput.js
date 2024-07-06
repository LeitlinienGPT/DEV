import React from 'react';
import './ChatOutput.css';
import ChatBubble from './ChatBubble';

const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = currentQuestion || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <ChatBubble
        content={question}
        variant="received"
        sender="You"
      />
      {!isLoading && lastMessage.answer && (
        <ChatBubble
          content={lastMessage.answer || "Warte auf die Antwort..."}
          variant="sent"
          sender="Bot"
        />
      )}
    </div>
  );
};

export default ChatOutput;