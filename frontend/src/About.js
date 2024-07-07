import * as React from 'react';
import { useState } from 'react';
import { CssVarsProvider, CssBaseline, Box, Grid, Card, CardContent, Typography } from '@mui/joy';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import Layout from './Layout';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';
import WerWirSind from './WerWirSind';

const missionVisionData = [
  {
    title: 'Unsere Mission',
    content: 'Unsere Mission ist es, Ärzten in Deutschland eine fortschrittliche, KI-gestützte Web-Oberfläche bereitzustellen. Diese Plattform ermöglicht schnellen und effizienten Zugang zu einer Vielzahl von medizinischen Leitlinien, verbessert die Entscheidungsfindung im Gesundheitswesen und setzt neue Maßstäbe für den Zugang zu medizinischem Wissen.',
    icon: <ExploreRoundedIcon sx={{ fontSize: 56, color: 'primary.500' }} />,
  },
  {
    title: 'Unsere Vision',
    content: 'Unsere Vision ist es, die führende digitale Ressource für Ärzte in Europa zu sein, die Zugang zu umfassenden medizinischen Informationen und Behandlungsrichtlinien bietet und damit die Standards der Patientenversorgung erhöht.',
    icon: <TerrainRoundedIcon sx={{ fontSize: 56, color: 'primary.500' }} />,
  },
];

const MissionVisionCard = ({ title, content, icon }) => (
  <Card sx={{ width: '100%', mb: 2, boxShadow: 3, borderRadius: 'lg', bgcolor: 'background.surface' }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {icon}
      <Typography level="h2" fontSize="lg" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Typography level="body2" sx={{ mb: 1, textAlign: 'justify' }}>
        {content}
      </Typography>
    </CardContent>
  </Card>
);

const FirmaHinterLeitlinienGPT = () => (
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2}>
      {missionVisionData.map((data, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <MissionVisionCard title={data.title} content={data.content} icon={data.icon} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const FAQs = () => (
  <div>
    <h1>Häufig gestellte Fragen (FAQs)</h1>
    {/* Add your content for "FAQs" here */}
  </div>
);

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