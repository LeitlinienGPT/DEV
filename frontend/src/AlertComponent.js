import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

const AlertVariousStates = () => {
  const [open, setOpen] = React.useState(true);

  return (
    open && (
      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column', marginBottom: 4 }}>
        <Alert
          sx={{ alignItems: 'flex-start' }}
          startDecorator={<InfoIcon />}
          variant="soft"
          color="neutral"
          endDecorator={
            <IconButton variant="soft" color="neutral" onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>Achtung</div>
            <Typography level="body-sm" color="neutral">
              Die bereitgestellten Informationen können Ungenauigkeiten enthalten. Bitte überprüfen Sie alle Informationen sorgfältig, da Halluzinationen auftreten können. Wir übernehmen keine Haftung.
            </Typography>
          </div>
        </Alert>
      </Box>
    )
  );
}

export default AlertVariousStates;