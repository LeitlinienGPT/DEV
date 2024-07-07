import React from 'react';
import './ChatOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';
import Grid from '@mui/joy/Grid';

const ChatOutput = ({ messages, isLoading, currentQuestion }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = currentQuestion || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <Card sx={{ width: '100%', borderRadius: '16px', boxShadow: 3, bgcolor: 'background.surface' }}>
          <CardContent>
            <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Frage</Typography>
            <Typography level="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
              {question}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ width: '100%', borderRadius: '16px', boxShadow: 3, bgcolor: 'background.surface' }}>
          <CardContent>
            <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Antwort</Typography>
            {isLoading ? (
              <div>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="rectangular" height="2rem" />
                <Skeleton variant="text" width="90%" />
              </div>
            ) : (
              <Typography level="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
                {lastMessage.answer}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChatOutput;