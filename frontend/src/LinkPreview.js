import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';

const LinkPreview = ({ previewData }) => {
  if (!previewData) return null;

  return (
    <Grid item xs={12} md={3}>
      <Box sx={{ border: '1px solid var(--joy-palette-divider)', p: 2 }}>
        {previewData.images?.length > 0 && (
          <img src={previewData.images[0]} alt={previewData.title} style={{ width: '100%' }} />
        )}
        <Typography variant="h6">{previewData.title}</Typography>
        <Typography variant="body2">{previewData.description}</Typography>
      </Box>
    </Grid>
  );
};

export default LinkPreview;