import React from 'react';
import IconButton from '@mui/joy/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const ReloadButton = React.forwardRef(({ handleClearChat }, ref) => { // Use React.forwardRef
  const handleReload = () => {
    handleClearChat(); // Call handleClearChat before reloading
    window.location.reload();
  };

  return (
    <IconButton ref={ref} onClick={handleReload} aria-label="Reload page">
      <RefreshIcon />
    </IconButton>
  );
});

export default ReloadButton;
