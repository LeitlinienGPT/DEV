// About.js
import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const About = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography level="h1">About Page</Typography>
      <Typography level="body1">This is the About page with some information about the application or team.</Typography>
    </Box>
  );
};

export default About;