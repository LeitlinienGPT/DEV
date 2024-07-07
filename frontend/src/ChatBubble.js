import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

const ChatBubble = ({ content, variant, timestamp, attachment = undefined, sender }) => {
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

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
            sx={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Sheet
              color={isSent ? 'primary' : 'neutral'}
              variant={isSent ? 'solid' : 'soft'}
              sx={{
                p: 1.25,
                borderRadius: 'lg',
                borderTopRightRadius: isSent ? 0 : 'lg',
                borderTopLeftRadius: isSent ? 'lg' : 0,
                backgroundColor: isSent
                  ? 'var(--joy-palette-primary-solidBg)'
                  : 'background.body',
              }}
            >
              <Typography
                level="body-sm"
                sx={{
                  color: isSent
                    ? 'var(--joy-palette-common-white)'
                    : 'var(--joy-palette-text-primary)',
                }}
              >
                {typeof content === 'string' ? content : JSON.stringify(content)}
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