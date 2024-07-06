// About.js
import * as React from 'react';
import { useState } from 'react';
import { CssVarsProvider, CssBaseline, Box } from '@mui/joy';
import Layout from './Layout';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';
import WerWirSind from './WerWirSind';

const FirmaHinterLeitlinienGPT = () => {
  return (
    <div>
      <h1>Vision and Mission</h1>
      {/* Add your content for "Die Firma hinter LeitlinienGPT" here */}
    </div>
  );
};

const FAQs = () => {
  return (
    <div>
      <h1>Häufig gestellte Fragen (FAQs)</h1>
      {/* Add your content for "FAQs" here */}
    </div>
  );
};

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