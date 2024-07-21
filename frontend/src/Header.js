import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ReloadButton from './ReloadButton';
import FeedbackForm from './FeedbackForm'; // Import the card component

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [showCard, setShowCard] = React.useState(false); // State to toggle card visibility

  const handleClearChat = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clear_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error clearing the chat history:', error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        backgroundColor: "background.level1",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1100,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton variant="plain" color="neutral" onClick={() => navigate('/')}>
          <HomeRoundedIcon />
        </IconButton>
        <Button variant="plain" color="neutral" onClick={() => navigate('/faq')}>FAQs</Button>
        <Button variant="plain" color="neutral" onClick={() => navigate('/about')}>Über Uns</Button>
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => setShowCard(!showCard)} // Toggle card visibility
        >
          Feedback
        </Button>
        <ColorSchemeToggle />
        <Tooltip title="Chat Historie und Quellen zurücksetzen" variant="outlined">
          <ReloadButton handleClearChat={handleClearChat} />
        </Tooltip>
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src={`${process.env.PUBLIC_URL}/favicon_LeitlinienGPT.png`}
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`${process.env.PUBLIC_URL}/favicon_LeitlinienGPT.png`}
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Demo Nutzer
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    demo_nutzer@gmail.com
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <SettingsRoundedIcon />
              Einstellungen (in Bearbeitung)
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <LogoutRoundedIcon />
              Ausloggen (in Bearbeitung)
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
      {showCard && (
        <Box
          sx={{
            position: 'absolute',
            top: '48px',
            right: '16px',
            zIndex: 1200,
          }}
        >
          <FeedbackForm />
        </Box>
      )}
    </Box>
  );
}