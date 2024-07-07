import React from 'react';
import './ChatOutput.css';
import ChatBubble from './ChatBubble';

const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = currentQuestion || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  console.log('Messages:', messages);
  console.log('Current Question:', currentQuestion);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <ChatBubble
        content={question}
        variant="sent"  // Changed to 'sent' to align the question on the right side
        sender="You"
      />
      {!isLoading && lastMessage.answer && (
        <ChatBubble
          content={lastMessage.answer || "Warte auf die Antwort..."}
          variant="received"  // Changed to 'received' to align the answer on the left side
          sender="Bot"
        />
      )}
    </div>
  );
};

export default ChatOutput;