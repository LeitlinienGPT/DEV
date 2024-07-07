import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import ReloadButton from './ReloadButton';

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

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
  const location = useLocation(); // Get the current location

  const handleNavigationClick = (section) => {
    navigate('/about', { state: { section } });
  };

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
      // Assuming you have a way to update the messages state in your main App component
      // You'll need to pass a function to update the messages from Header to App
      // For example: setMessages([]);
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
        position: "fixed", // Change to fixed position
        top: 0, // Ensure it sticks to the top
        width: "100%", // Make sure it covers the full width
        zIndex: 1100, // Ensure it stays above other elements
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => navigate('/')} 
        >
          <HomeRoundedIcon />
        </IconButton>
        <Button variant="plain" color="neutral" onClick={() => navigate('/faq')}>FAQs</Button>
        <Button variant="plain" color="neutral" onClick={() => navigate('/about')}>Über Uns</Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => window.open('mailto:leitliniengpt@gmail.com', '_blank')}
          startDecorator={<EmailRoundedIcon />} 
        >
          Feedback an die Gründer
        </Button>
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
            onClose={() => { 
              if (location.pathname !== '/about') {
                navigate('/about'); 
              }
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
    </Box>
  );
}