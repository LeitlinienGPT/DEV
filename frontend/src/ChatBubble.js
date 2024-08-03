import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown';
import Link from '@mui/joy/Link';
import DOMPurify from 'dompurify';
import './ChatOutput.css';

// ChatBubble component
const ChatBubble = ({ question, answer, sourceDocuments = [] }) => {
  // Function to replace "Quelle 1", "Quelle 2", "Quelle 3" with hyperlinks without brackets and add '&' between consecutive sources
  const renderContentWithLinks = (content) => {
    if (typeof content !== 'string') return content;

    const regex = /\(Quelle \d+(?:; Quelle \d+)*\)/g;
    let lastIndex = 0;
    const parts = [];

    content.replace(regex, (match, offset) => {
      if (offset > lastIndex) {
        parts.push(content.slice(lastIndex, offset));
      }

      const items = match.split(';').map((item) => item.trim());

      items.forEach((item, index) => {
        if (index > 0) {
          parts.push(' & ');
        }

        const matchInner = item.match(/Quelle (\d+)/);
        if (matchInner) {
          const sourceIndex = parseInt(matchInner[1], 10) - 1;
          const source = sourceDocuments[sourceIndex];
          if (source && source.metadata && source.metadata.href) {
            parts.push(`[${matchInner[1]}](${source.metadata.href}#page=${source.metadata.Page})`);
          } else {
            parts.push(`${matchInner[1]}`);
          }
        }
      });

      lastIndex = offset + match.length;
    });

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.join('');
  };

  const questionContent = renderContentWithLinks(question);
  const answerContent = renderContentWithLinks(answer);

  return (
    <Grid container spacing={2} sx={{ maxWidth: '100%', p: 2 }}>
      <Grid item xs={12} md={9}>
        <Typography
          level="title-md"
          sx={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}
        >
          {questionContent}
        </Typography>
        <Typography
          level="title-md"
          sx={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}
        >
          Antwort
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--joy-palette-text-primary)',
            textAlign: 'justify',
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ ...props }) => <Link {...props} sx={{ color: 'black', fontWeight: 'bold' }} />,
              blockquote: ({ ...props }) => (
                <Typography
                  sx={{
                    borderLeft: '4px solid var(--joy-palette-divider)',
                    paddingLeft: 2,
                    color: 'var(--joy-palette-text-secondary)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                  {...props}
                />
              ),
            }}
          >
            {answerContent}
          </ReactMarkdown>
        </Typography>
      </Grid>
    </Grid>
  );
};

// ChatOutput component
const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = currentQuestion || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  console.log('Messages:', messages);
  console.log('Current Question:', currentQuestion);

  const sanitizedMarkdown = lastMessage.answer ? DOMPurify.sanitize(lastMessage.answer) : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <ChatBubble
        question={question}
        answer={sanitizedMarkdown}
        sourceDocuments={lastMessage.source_documents || []}
      />
    </div>
  );
};

export default ChatOutput;