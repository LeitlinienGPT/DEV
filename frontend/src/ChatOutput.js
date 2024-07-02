import React from 'react';
import './ChatOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';

const ChatOutput = ({ messages, isLoading }) => {
  const lastMessage = messages[messages.length - 1] || {};
  const question = lastMessage.text || "Bitte stelle eine Frage, um eine Antwort zu erhalten.";

  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '1rem', paddingBottom: '1rem', width: '100%' }}>
      <Card sx={{ width: '100%', borderRadius: '16px', boxShadow: 3, bgcolor: 'background.surface' }}> 
        <CardContent>
          <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Frage</Typography>
          <Typography level="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
            {question}
          </Typography>
        </CardContent>
      </Card>

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
              {lastMessage.answer || "Warte auf die Antwort..."}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatOutput;