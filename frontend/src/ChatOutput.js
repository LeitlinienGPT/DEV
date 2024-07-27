import React from 'react';
import DOMPurify from 'dompurify';
import './ChatOutput.css';
import ChatBubble from './ChatBubble';

const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = currentQuestion || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  console.log('Messages:', messages);
  console.log('Current Question:', currentQuestion);

  const sanitizedMarkdown = lastMessage.answer ? DOMPurify.sanitize(lastMessage.answer) : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <ChatBubble
        content={question}
        variant="sent"
        sender="You"
      />
      {!isLoading && lastMessage.answer && (
        <ChatBubble
          content={sanitizedMarkdown}
          variant="received"
          sender="Bot"
          sourceDocuments={lastMessage.source_documents || []}
        />
      )}
    </div>
  );
};

export default ChatOutput;