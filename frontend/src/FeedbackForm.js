import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import EmailIcon from '@mui/icons-material/Email';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSend = async () => {
    const mailtoLink = `mailto:leitliniengpt@gmail.com?cc=${email}&subject=Feedback von ${name}&body=${encodeURIComponent(feedback)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Card
      size="lg"
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        mx: 'auto',
        overflow: 'auto',
        resize: 'horizontal',
        p: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input 
            placeholder="Geben Sie Ihren Namen ein" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Adresse</FormLabel>
          <Input 
            type="email"
            placeholder="Geben Sie Ihre E-Mail-Adresse ein" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </FormControl>
        <FormControl>
          <FormLabel>Feedback</FormLabel>
          <Textarea 
            placeholder="Geben Sie Ihr Feedback ein"
            minRows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ width: '100%' }}
          />
        </FormControl>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button 
            variant="solid" 
            color="primary" 
            onClick={handleSend}
            disabled={!name || !email || !feedback}
          >
            Senden
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}