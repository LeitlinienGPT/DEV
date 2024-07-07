import * as React from 'react';
import { Box, Grid, Card, CardContent, CardOverflow, CardCover, Typography, Button, Avatar } from '@mui/joy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const bioData = [
  {
    name: 'Marlon',
    topCompetencies: 'Dataengineering, Projectmanagement',
    bio: 'Marlon ist Data Engineering Consultant und Executive Assistant bei reeeliance, wo er die analytische Datenarchitektur von multinationalen Unternehmen auf Qualität testet und in der Umsetzung begleitet. Er hat Erfahrung in Datenmanagement und innovativen Datenprodukten durch seine Tätigkeit bei Fintechs, Retail- und MedTech-Unternehmen. Neben seiner Rolle als Data Engineer ist er Mitgründer dieses Start-ups. Marlon hält einen Bachelor in Internationaler Betriebswirtschaftslehre mit Fokus auf Digitalem Management von der Cologne Business School.',
    linkedin: 'https://www.linkedin.com/in/m-hamm/',
    avatar: 'marlon.jpg'
  },
  {
    name: 'Tim',
    topCompetencies: 'Robotics, Data Integration',
    bio: 'Tim ist ein erfahrener Ingenieur mit umfangreicher Erfahrung in Robotik und Datenintegration. Derzeit verfolgt er seinen Master in Robotics, Cognition, Intelligence an der Technischen Universität München. Seine beruflichen Erfahrungen umfassen Tätigkeiten bei renommierten Institutionen wie dem Deutschen Zentrum für Luft- und Raumfahrt (DLR) und der SMS group. Neben seiner Rolle bei reeeliance arbeitet er an der Entwicklung von LLM-Chatbots unter Verwendung von Retrieval Augmented Generation (RAG) Mustern.',
    linkedin: 'https://www.linkedin.com/in/tim-strohmeyer-437a76185/',
    avatar: 'tim.jpg'
  },
  {
    name: 'Paolo',
    topCompetencies: 'Unternehmensstrategie, Entrepreneurship & Innovation',
    bio: 'Paolo ist Junior Investment Manager bei der UnternehmerTUM, wo er B2B Deep Tech Start-ups unterstützt. Er hat umfassende Erfahrung in Unternehmensstrategie und Innovation durch seine Tätigkeit bei Microsoft und Eight Advisory. Neben seiner Rolle als Investment Manager ist er Mitgründer dieses Start-ups. Paolo hat einen Master in Management und Technologie von der TU München und einen Bachelor in Internationaler Betriebswirtschaftslehre von der Rotterdam School of Management.',
    linkedin: 'https://www.linkedin.com/in/paolo-oppelt/',
    avatar: '/paolo.jpg'
  },
];

const BioCard = ({ name, topCompetencies, bio, linkedin, avatar }) => (
  <Card sx={{ width: '100%', mb: 2 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar src={avatar} alt={name} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
        {name}
      </Typography>
      <Typography level="body3" sx={{ mb: 1, fontStyle: 'italic' }}>
        {topCompetencies}
      </Typography>
      <Typography level="body2" sx={{ mb: 1, textAlign: 'justify' }}>
        {bio}
      </Typography>
      <Button
        variant="outlined"
        startDecorator={<LinkedInIcon />}
        component="a"
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textTransform: 'none' }}
      >
        Connect
      </Button>
    </CardContent>
  </Card>
);

const WerWirSind = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card sx={{ width: '100%', mb: 1 }}>
            <CardOverflow>
              <CardCover>
                <img src="team.jpg" alt="Team" />
              </CardCover>
              <CardContent>
                <Typography level="h1" fontSize="lg" sx={{ mb: 0.5 }}>
                  Founders
                </Typography>
              </CardContent>
            </CardOverflow>
            <CardContent>
              <Typography level="body2" sx={{ textAlign: 'justify' }}>
                Marlon, Tim und Paolo bilden ein starkes und kompetentes Team mit sieben Jahren Berufserfahrung und einem umfangreichen Netzwerk im Start-up-Ökosystem. Ihre Expertise liegt an der Schnittstelle von Data Science, Natural Language Processing und Unternehmensführung. Alle drei genießen den Ruf, konstant neue Maßstäbe zu setzen, und verfügen über eine beeindruckende Erfolgsbilanz bei der herausragenden Projektdurchführung – auch in gemeinsamer Zusammenarbeit. Sie sind hochmotiviert, ein profitables Unternehmen aufzubauen und einen positiven Einfluss zu erzielen, um die Arbeit von Ärzten in Deutschland zu erleichtern. SearchAid ist aus einer langjährigen Freundschaft und Bekanntschaften während des Studiums entstanden.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {bioData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BioCard 
                name={data.name} 
                topCompetencies={data.topCompetencies} 
                bio={data.bio} 
                linkedin={data.linkedin} 
                avatar={data.avatar} 
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WerWirSind;