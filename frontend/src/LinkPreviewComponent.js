import React, { useState, useEffect } from 'react';
import LinkPreview from '@ashwamegh/react-link-preview';
import '@ashwamegh/react-link-preview/dist/index.css';
import Box from '@mui/joy/Box'; // Import the Box component

const LinkPreviewComponent = ({ url }) => {
  const [shouldRenderPreview, setShouldRenderPreview] = useState(false);

  useEffect(() => {
    const checkContent = async () => {
      try {
        const response = await fetch(url, { mode: 'no-cors' });
        // In no-cors mode, we can't read the response body, so assume it's valid if no error was thrown
        if (response.type === 'opaque' || (response.ok && response.status !== 404)) {
          setShouldRenderPreview(true);
        } else {
          setShouldRenderPreview(false);
        }
      } catch (error) {
        // Log the error to the console for debugging purposes
        console.error('Error fetching the URL:', error);
        setShouldRenderPreview(false);
      }
    };

    checkContent();
  }, [url]);

  return shouldRenderPreview ? (
    <Box
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <LinkPreview
        url={url}
        width="100%"
        customDomain="https://lpdg-server.azurewebsites.net/parse/link"
        fallback={<div>Could not load preview</div>}
      />
    </Box>
  ) : null;
};

export default LinkPreviewComponent;