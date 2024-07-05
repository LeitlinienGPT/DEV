// About.js
import * as React from 'react'; 
import { useState } from 'react'; 
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Avatar from '@mui/joy/Avatar';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Layout from './Layout';
import Navigation from './Navigation';

const peopleData = [
  // ... (your peopleData array)
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
          {activeNavItem === 'Wer wir sind' && (
            <List
              sx={{
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                gap: 2,
                p: 2, 
              }}
            >
              {peopleData.map((person, index) => (
                <Sheet
                  key={index}
                  component="li"
                  variant="outlined"
                  sx={{
                    borderRadius: 'sm',
                    p: 2,
                    listStyle: 'none',
                    width: '320px', 
                    flexShrink: 0, 
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      variant="outlined"
                      src={person.avatar2x}
                      srcSet={`${person.avatar2x} 2x`} // Corrected line
                      sx={{ borderRadius: '50%' }}
                    />
                    <Stack>
                      <Typography fontWeight="lg">{person.name}</Typography>
                      <Typography level="body-sm">{person.position}</Typography>
                    </Stack>
                  </Box>

                  <Divider component="div" sx={{ my: 2 }} />

                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    Rolle
                  </Typography>
                  <List sx={{ '–ListItemDecorator-size': '40px', gap: 2 }}>
                    {person.companyData.map((company, companyIndex) => (
                      <ListItem key={companyIndex} sx={{ alignItems: 'flex-start' }}>
                        <ListItemDecorator
                          sx={{
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              height: '100%',
                              width: '1px',
                              bgcolor: 'divider',
                              left: 'calc(var(–ListItem-paddingLeft) + 12px)',
                              top: '50%',
                            },
                          }}
                        >
                          <Avatar src={company.logo} sx={{ '–Avatar-size': '24px' }} />
                        </ListItemDecorator>
                        <ListItemContent>
                          <Typography fontWeight="lg">{company.role}</Typography>
                          <Typography level="body-sm">{company.name}</Typography>
                          <Typography level="body-sm" textColor="text.tertiary">
                            {company.years}
                          </Typography>
                        </ListItemContent>
                      </ListItem>
                    ))}
                  </List>

                  <Divider component="div" sx={{ my: 2 }} />

                  <Typography level="title-sm">Skills</Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                    {person.skills.map((skill, skillIndex) => (
                      <Chip key={skillIndex} variant="soft" size="sm">
                        {skill}
                      </Chip>
                    ))}
                  </Box>
                </Sheet>
              ))}
            </List>
          )}

          {activeNavItem === 'Die Firma hinter LeitlinienGPT' && (
            <div>
              <h1>Content for Die Firma hinter LeitlinienGPT</h1>
              {/* Add your content for "Die Firma hinter LeitlinienGPT" here */}
            </div>
          )}

          {activeNavItem === 'FAQs' && (
            <div>
              <h1>Häufig gestellte Fragen (FAQs)</h1>
              {/* Add your content for "FAQs" here */}
            </div>
          )}

        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}