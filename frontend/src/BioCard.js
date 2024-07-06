// BioCard.js
import * as React from 'react';
import { Box, Card, CardContent, Button, Avatar, Typography } from '@mui/joy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const BioCard = ({ name, bio, linkedin, avatar }) => {
  return (
    <Card sx={bioCardStyles}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src={avatar} sx={{ '--Avatar-size': '5rem' }} />
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm">
          {bio}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ bgcolor: 'background.surface', mb: 1 }}
            component="a"
            href={linkedin}
            target="_blank"
            startDecorator={<LinkedInIcon />} // Change startIcon to startDecorator
          >
            Connect {<LinkedInIcon />}
          </Button>
          <Button
            variant="outlined"
            sx={{ bgcolor: 'background.surface' }}
            component="a"
            href="mailto:leitliniengpt@gmail.com"
            target="_blank"
          >
            Message
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const bioCardStyles = {
  maxWidth: '100%', // Ensures cards never exceed their container
  boxShadow: 'lg',
};

export default BioCard;