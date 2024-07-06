import { extendTheme } from '@mui/joy/styles';

const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#ffffff', // white background for light mode
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: '#121212', // dark background for dark mode
        },
      },
    },
  },
  components: {
    JoyCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.vars.palette.background.body,
        },
      }),
    },
  },
});

export default joyTheme;