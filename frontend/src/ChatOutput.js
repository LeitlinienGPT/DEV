import React from 'react';
import Grid from '@mui/material/Grid'; 
import Typography from '@mui/joy/Typography'; 
import ReactMarkdown from 'react-markdown';
import Link from '@mui/joy/Link';
import DOMPurify from 'dompurify';
import Box from '@mui/joy/Box';
import LinkPreviewComponent from './LinkPreviewComponent';
import { useTheme } from '@mui/joy/styles'; // Import the useTheme hook

const ChatBubble = ({ answer, sourceDocuments = [] }) => {
  const theme = useTheme(); // Get the current theme

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

      const linkContent = items.map((item, index) => {
        const matchInner = item.match(/Quelle (\d+)/);
        if (matchInner) {
          const sourceIndex = parseInt(matchInner[1], 10) - 1;
          const source = sourceDocuments[sourceIndex];
          if (source && source.metadata && source.metadata.href) {
            return `[(${matchInner[1]})](${source.metadata.href}#page=${source.metadata.Page})`;
          } else {
            return `Quelle ${matchInner[1]}`;
          }
        }
        return '';
      }).join('; ');

      parts.push(`${linkContent}`);
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
                  <Link 
                    {...props} 
                    sx={{ 
                      color: theme.palette.primary.main, // Use theme's primary color for links
                      fontWeight: 'bold' 
                    }} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                  />
                ),
                blockquote: ({ ...props }) => (
                  <Typography
                    sx={{
                      borderLeft: `4px solid ${theme.palette.divider}`,
                      paddingLeft: 2,
                      color: theme.palette.text.secondary,
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

const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const sanitizedMarkdown = lastMessage.answer ? DOMPurify.sanitize(lastMessage.answer) : '';

  const extractHashtags = (text) => {
    const hashtagRegex = /(^|\s)(#[\w\-ÄÖÜäöü]+)/g;
    const hashtags = [];
    let match;
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[2].slice(1));
    }
    return hashtags;
  };

  const hashtags = extractHashtags(sanitizedMarkdown).slice(0, 3);

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