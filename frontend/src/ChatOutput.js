import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown';
import Link from '@mui/joy/Link';
import DOMPurify from 'dompurify';
import LinkPreviewComponent from './LinkPreviewComponent';
import './ChatOutput.css';

// ChatBubble component
const ChatBubble = ({ answer, sourceDocuments = [] }) => {
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

  const renderContentWithHashtags = (content) => {
    const hashtagRegex = /(^|\s)(#[\w\-ÄÖÜäöü]+)/g;
    return content.replace(hashtagRegex, (match, p1, hashtag) => {
      const encodedHashtag = encodeURIComponent(hashtag.slice(1));
      return `${p1}[${hashtag}](https://flexikon.doccheck.com/de/${encodedHashtag})`;
    });
  };

  const answerContentWithLinks = renderContentWithLinks(answer);
  const answerContent = renderContentWithHashtags(answerContentWithLinks);

  return (
    <Grid container spacing={2}>
      {answer && (
        <Grid item xs={12} sx={{ marginBottom: '2rem' }}>
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
                a: ({ ...props }) => (
                  <Link {...props} sx={{ color: 'black', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" />
                ),
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
      )}
    </Grid>
  );
};

// ChatOutput component
const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};

  console.log('Messages:', messages);
  console.log('Current Question:', currentQuestion);

  const sanitizedMarkdown = lastMessage.answer ? DOMPurify.sanitize(lastMessage.answer) : '';

  // Extract hashtags from the answer
  const extractHashtags = (text) => {
    const hashtagRegex = /(^|\s)(#[\w\-ÄÖÜäöü]+)/g;
    const hashtags = [];
    let match;
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[2].slice(1)); // Remove the '#' character
    }
    return hashtags;
  };

  const hashtags = extractHashtags(sanitizedMarkdown).slice(0, 3); // Get up to three hashtags

  return (
    <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '1.5 auto', padding: '1.5rem' }}>
      {sanitizedMarkdown && (
        <Grid item xs={12} md={9} sx={{ paddingRight: '2rem', paddingLeft: '1.5rem' }}>
          <ChatBubble
            answer={sanitizedMarkdown}
            sourceDocuments={lastMessage.source_documents || []}
          />
        </Grid>
      )}
      <Grid item xs={12} md={3} sx={{ paddingLeft: '1.5rem' }}>
        {hashtags.map((hashtag, index) => (
          <Box key={index} sx={{ marginBottom: '1.5rem' }}>
            <LinkPreviewComponent
              url={`https://flexikon.doccheck.com/de/${encodeURIComponent(hashtag)}`}
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChatOutput;