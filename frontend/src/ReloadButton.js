import React from 'react';
import IconButton from '@mui/joy/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const ReloadButton = ({ handleClearChat }) => { // Pass handleClearChat as a prop
  const handleReload = () => {
    handleClearChat(); // Call handleClearChat before reloading
    window.location.reload();
  };

  return (
    <IconButton onClick={handleReload} aria-label="Reload page">
      <RefreshIcon />
    </IconButton>
  );
};

export default ReloadButton;