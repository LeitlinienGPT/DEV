import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ content, variant, timestamp, attachment = undefined, sender, sourceDocuments = [] }) => {
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

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
            parts.push(`[Quelle ${matchInner[1]}](${source.metadata.href})`);
          } else {
            parts.push(`Quelle ${matchInner[1]}`);
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

  const markdownContent = renderContentWithLinks(content);

  return (
    <Box sx={{ maxWidth: '100%', display: 'flex', justifyContent: isSent ? 'flex-end' : 'flex-start' }}>
      <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 0.25 }}
        >
          <Typography level="body-xs">
            {sender === '' ? sender : sender.name}
          </Typography>
          <Typography level="body-xs">{timestamp}</Typography>
        </Stack>
        {attachment ? (
          <Sheet
            variant="outlined"
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar color="primary" size="lg">
                <InsertDriveFileRoundedIcon />
              </Avatar>
              <div>
                <Typography fontSize="sm">{attachment.fileName}</Typography>
                <Typography level="body-sm">{attachment.size}</Typography>
              </div>
            </Stack>
          </Sheet>
        ) : (
          <Box
            sx={{ 
              position: 'relative', 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Sheet
              color={isSent ? "primary" : "neutral"} // Adjust color for better contrast in Light Mode
              variant="soft" // Apply soft variant for the background
              sx={{
                p: 2,
                borderRadius: 'lg',
                borderTopRightRadius: isSent ? 0 : 'lg',
                borderTopLeftRadius: isSent ? 'lg' : 0,
                // Dynamic background color based on sender
                backgroundColor: isSent
                  ? 'var(--joy-palette-primary-softBg)' // Use primary soft background if sent
                  : 'var(--joy-palette-neutral-softBg)', // Use neutral soft background if received
              }}
            >
              <Typography
                level="body-sm"
                sx={{
                  color: isSent
                    ? 'var(--joy-palette-primary-contrastText)'
                    : 'var(--joy-palette-text-primary)',
                  textAlign: 'justify'
                }}
              >
                <ReactMarkdown>
                  {markdownContent}
                </ReactMarkdown>
              </Typography>
            </Sheet>
            {(isHovered || isLiked) && isSent && (
              <Stack
                direction="row"
                justifyContent={isSent ? 'flex-end' : 'flex-start'}
                spacing={0.5}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  p: 1.5,
                  ...(isSent
                    ? {
                        left: 0,
                        transform: 'translate(-100%, -50%)',
                      }
                    : {
                        right: 0,
                        transform: 'translate(100%, -50%)',
                      }),
                }}
              >
                <IconButton
                  variant={isLiked ? 'soft' : 'plain'}
                  color={isLiked ? 'danger' : 'neutral'}
                  size="sm"
                  onClick={() => setIsLiked((prevState) => !prevState)}
                >
                  {isLiked ? '❤️' : <FavoriteBorderIcon />}
                </IconButton>
              </Stack>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ChatBubble;