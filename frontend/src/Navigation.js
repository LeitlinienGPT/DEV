import * as React from 'react';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded'; // For FAQ
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'; // For Company

export default function Navigation({ onNavigationClick }) {
  return (
    <List size="sm" sx={{ '--ListItem-radius': 'var(--joy-radius-sm)', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>Browse</ListSubheader>
        <List aria-labelledby="nav-list-browse" sx={{ '& .JoyListItemButton-root': { p: '8px' } }}>
          <ListItem>
            <ListItemButton onClick={() => onNavigationClick('Wer wir sind')}>
              <ListItemDecorator>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Wer wir sind</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onNavigationClick('Die Firma hinter LeitlinienGPT')}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <BusinessRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Die Firma hinter LeitlinienGPT</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onNavigationClick('FAQs')}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <QuestionAnswerRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>FAQs</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}