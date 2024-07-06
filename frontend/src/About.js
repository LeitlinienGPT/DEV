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
  Button,
  Avatar,
} from '@mui/joy';
import Layout from './Layout';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const bioData = [
  {
    name: 'Marlon',
    bio: 'Hello, this is the bio of Marlon. I am a member of SearchAid. I specialize in various fields and love to contribute to the team.',
    linkedin: 'https://www.linkedin.com/in/m-hamm/',
    avatar: 'marlon.jpg'
  },
  {
    name: 'Tim',
    bio: 'Hello, this is the bio of Tim. I am a member of SearchAid. I specialize in various fields and love to contribute to the team.',
    linkedin: 'https://www.linkedin.com/in/tim-strohmeyer-437a76185/',
    avatar: 'tim.jpg'
  },
  {
    name: 'Paolo',
    bio: 'Top-Kompetenzen: Unternehmensstrategie, Entrepreneurship & Innovation Paolo ist Junior Investment Manager bei UnternehmerTUM, wo er B2B Deep Tech Start-ups unterstützt. Er hat umfassende Erfahrung in Unternehmensstrategie und Innovation durch seine Tätigkeit bei Microsoft und Eight Advisory. Neben seiner Rolle als Investment Manager ist er Mitgründer von SearchAid, einem innovativen Startup. Paolo hat einen Master in Management und Technologie von der TU München und einen Bachelor in Internationaler Betriebswirtschaftslehre von der Rotterdam School of Management. Seine fundierten Kenntnisse in Unternehmensstrategie und technologischer Innovation machen ihn zu einem wertvollen Mitglied des Gründungsteams.',
    linkedin: 'https://www.linkedin.com/in/paolo-oppelt/',
    avatar: '/paolo.jpg'
  },
];

// this makes it possible to navigate directly to faq from another part of the website
export default function About() {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(location.state?.section || 'Wer wir sind');

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
      <Grid container spacing={1}>
        <Grid item xs={12}> {/* Ensure Founders card takes full width */}
          <Card sx={{ width: '100%', mb: 1 }}>
            <CardOverflow>
              <CardCover>
                <img src="team.jpg" alt="Team" />
              </CardCover>
              <CardContent>
                <Typography level="h1" fontSize="lg" sx={{ mb: 0.5 }}>
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
          </Card>
        </Grid>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={4}>
            <BioCard 
              name={bioData[0].name} 
              bio={bioData[0].bio} 
              linkedin={bioData[0].linkedin} 
              avatar={bioData[0].avatar} 
            />
          </Grid>
          <Grid xs={4}>
            <BioCard 
              name={bioData[1].name} 
              bio={bioData[1].bio} 
              linkedin={bioData[1].linkedin} 
              avatar={bioData[1].avatar} 
            />
          </Grid>
          <Grid xs={4}>
            <BioCard 
              name={bioData[2].name} 
              bio={bioData[2].bio} 
              linkedin={bioData[2].linkedin} 
              avatar={bioData[2].avatar} 
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function FirmaHinterLeitlinienGPT() {
  return (
    <div>
      <h1>Vision and Mission</h1>
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

function BioCard({ name, bio, linkedin, avatar }) {
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
            startIcon={<LinkedInIcon />}
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
}

const bioCardStyles = {
  maxWidth: '100%', // Ensures cards never exceed their container
  boxShadow: 'lg',
};