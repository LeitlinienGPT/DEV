import * as React from 'react';
import Box from '@mui/joy/Box';

// Root component: Defines the basic grid structure of your layout
function Root(props) {
  return (
    <Box
      {...props} 
      sx={[
        {
          bgcolor: 'background.appBody', // Background color for the entire layout
          display: 'grid', // Enables grid layout
          gridTemplateColumns: {
            xs: '1fr', // On extra-small screens (mobile), one full-width column
            sm: 'minmax(64px, 200px) 1fr', // On small screens and larger:
                                             // - First column (sidebar): min 64px, max 200px
                                             // - Second column (main content): takes up remaining space (1fr)
          },
          gridTemplateRows: '64px 1fr', // Two rows:
                                         // - First row (header): fixed height of 64px
                                         // - Second row (content): takes up remaining space (1fr)
          minHeight: '100vh', // Layout will be at least the height of the viewport
        },
        // Allows for applying additional styles using the `sx` prop 
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

// Header component: Likely your website's header
function Header(props) {
  return (
    <Box
      component="header" // Semantic HTML element for header
      className="Header" // Class name for styling
      {...props} // Spreads any props passed to this component
      sx={[
        {
          p: 2, // Padding around the header content
          gap: 2, // Gap between header elements
          bgcolor: 'background.surface', // Background color
          display: 'flex', // Enables flexbox layout for header content
          flexDirection: 'row', // Arranges items horizontally
          justifyContent: 'space-between', // Distributes space evenly between items
          alignItems: 'center', // Vertically aligns items to the center
          gridColumn: '1 / -1', // Header spans across all columns of the grid
          borderBottom: '1px solid', // Bottom border style
          borderColor: 'divider', // Border color
          position: 'sticky', // Makes the header "sticky" to the top on scroll
          top: 0, // Positions the header at the top of the viewport
          zIndex: 1100, // Ensures header stays above most other elements
        },
        // Allows for applying additional styles using the `sx` prop
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

// SideNav component: Your sidebar navigation
function SideNav(props) {
  return (
    <Box
      component="nav" // Semantic HTML element for navigation
      className="Navigation" // Class name for styling
      {...props} // Spreads any props passed to the component
      sx={[
        {
          p: 2, // Padding around sidebar content
          bgcolor: 'background.surface', // Background color
          borderRight: '1px solid', // Right border style
          borderColor: 'divider', // Right border color
          display: {
            xs: 'none', // Hides the sidebar on extra-small screens (mobile)
            sm: 'initial', // Shows the sidebar on small screens and larger
          },
        },
        // Allows for applying additional styles using the `sx` prop
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

// Main component: The main content area of your layout
function Main(props) {
  return (
    <Box
      component="main" // Semantic HTML element for main content
      className="Main" // Class name for styling
      {...props} // Spreads any props passed to the component
      sx={[{ 
        p: 2, // Padding around main content (consider removing/reducing this if your cards are too small)
        // ... you might want to make changes to the main container here
       }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]} 
    />
  );
}

// Layout object: Exports the layout components for use in your app
const Layout = {
  Root,
  Header,
  SideNav,
  Main,
};

export default Layout;