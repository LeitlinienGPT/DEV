import InfoIcon from '@mui/icons-material/Info';
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
            Die bereitgestellten Antworten basieren auf einem fortschrittlichen System, das primär medizinische Leitlinien sowie aktuelle wissenschaftliche Erkenntnisse analysiert. Aufgrund der Natur des algorithmischen Prozesses können gelegentlich Ungenauigkeiten oder sogenannte Halluzinationen auftreten. Bitte überprüfen Sie alle Informationen sorgfältig; wir übernehmen keine Haftung für eventuelle Schäden oder Verluste, die durch die Verwendung der bereitgestellten Informationen entstehen.
            </Typography>
          </div>
        </Alert>
      </Box>
    )
  );
}

export default AlertVariousStates;