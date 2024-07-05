import * as React from 'react';
import { useState } from 'react';
import {
  CssVarsProvider,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardOverflow,
  CardCover,
  CardActions,
  Button,
  Avatar,
  SvgIcon,
  ButtonGroup,
} from '@mui/joy';
import Layout from './Layout';
import Navigation from './Navigation';

const bioData = [
  {
    name: 'Marlon',
    bio: 'Hello, this is the bio of Marlon. I am a member of SearchAid. I specialize in various fields and love to contribute to the team.',
    linkedin: 'https://www.linkedin.com/in/m-hamm/',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQFMBpTEUvjKfQ/profile-displayphoto-shrink_200_200/0/1643726150373?e=1693440000&v=beta&t=sxKwzDdcuA5PRPYzJZnRJTC3Soh-RkG6tNR1rEflC_E'
  },
  {
    name: 'Tim',
    bio: 'Hello, this is the bio of Tim. I am a member of SearchAid. I specialize in various fields and love to contribute to the team.',
    linkedin: 'https://www.linkedin.com/in/tim-strohmeyer-437a76185/',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQF-HZwvUqOR9g/profile-displayphoto-shrink_200_200/0/1627398939381?e=1693440000&v=beta&t=FnTNTMZ_DJhz-GH9AdpB4Y8RX4OeK9G2H6YX_vhQHIQ'
  },
  {
    name: 'Paolo',
    bio: 'Hello, this is the bio of Paolo. I am a member of SearchAid. I specialize in various fields and love to contribute to the team.',
    linkedin: 'https://www.linkedin.com/in/paolo-oppelt/',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQF-ZGdYHG3ohA/profile-displayphoto-shrink_200_200/0/1583337480194?e=1693440000&v=beta&t=O88zXeN6fpl4FvTVfyXwSKAEN39DOJ3QThz3QOaGy8k'
  },
];

export default function About() {
  const [activeNavItem, setActiveNavItem] = useState('Wer wir sind');

  const handleNavigationClick = (itemName) => {
    setActiveNavItem(itemName);
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root>
        <Layout.SideNav>
          <Navigation onNavigationClick={handleNavigationClick} />
        </Layout.SideNav>
        <Layout.Main>
          {activeNavItem === 'Wer wir sind' && <WerWirSind />}
          {activeNavItem === 'Die Firma hinter LeitlinienGPT' && <FirmaHinterLeitlinienGPT />}
          {activeNavItem === 'FAQs' && <FAQs />}
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}

function WerWirSind() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} >
          <Card sx={{ width: '100%', mb: 4 }}>
            <CardOverflow>
              <CardCover>
                <img src="" alt="" />
              </CardCover>
              <CardContent>
                <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
                  Founders
                </Typography>
                <Typography level="body2"></Typography>
              </CardContent>
            </CardOverflow>
            <CardContent>
              <Typography level="body2">
                Marlon, Tim und Paolo bilden ein starkes und kompetentes Team mit sieben Jahren Berufserfahrung und einem umfangreichen Netzwerk im Start-up-Ökosystem. Ihre Expertise liegt an der Schnittstelle von Data Science, Natural Language Processing und Unternehmensführung. Alle drei genießen den Ruf, konstant neue Maßstäbe zu setzen, und verfügen über eine beeindruckende Erfolgsbilanz bei der herausragenden Projektdurchführung – auch in gemeinsamer Zusammenarbeit. Sie sind hochmotiviert, ein profitables Unternehmen aufzubauen und einen positiven Einfluss zu erzielen, um die Arbeit von Ärzten in Deutschland zu erleichtern. SearchAid ist aus einer langjährigen Freundschaft und Bekanntschaften während des Studiums entstanden.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="solid" size="sm" color="primary">
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {bioData.map((bio, index) => (
              <Grid key={bio.name} item xs={12} sm={10}>
                <BioCard name={bio.name} bio={bio.bio} index={index} linkedin={bio.linkedin} avatar={bio.avatar} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function FirmaHinterLeitlinienGPT() {
  return (
    <div>
      <h1>Content for Die Firma hinter LeitlinienGPT</h1>
      {/* Add your content for "Die Firma hinter LeitlinienGPT" here */}
    </div>
  );
}

function FAQs() {
  return (
    <div>
      <h1>Häufig gestellte Fragen (FAQs)</h1>
      {/* Add your content for "FAQs" here */}
    </div>
  );
}

function BioCard({ name, bio, index, linkedin, avatar }) {
  return (
    <Card sx={bioCardStyles}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src={avatar} sx={{ '--Avatar-size': '4rem' }} />
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          {bio}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ bgcolor: 'background.surface', mb: 1 }}
            startIcon={<LinkedInIcon />}
            component="a"
            href={linkedin}
            target="_blank"
          >
            Connect
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
}

function LinkedInIcon() {
  return (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.51c-1.14 0-2.06-.93-2.06-2.08 0-1.14.92-2.07 2.06-2.07s2.06.93 2.06 2.07c0 1.15-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.59c0-1.33-.03-3.03-1.84-3.03-1.84 0-2.12 1.43-2.12 2.91v5.71h-3.56V9h3.42v1.56h.05c.48-.9 1.65-1.84 3.4-1.84 3.64 0 4.31 2.4 4.31 5.51v6.22z"
        />
      </svg>
    </SvgIcon>
  );
}

const bioCardStyles = {
  width: 320,
  maxWidth: '100%',
  boxShadow: 'lg',
};