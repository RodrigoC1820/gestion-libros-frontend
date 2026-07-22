import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6D4C41',
      dark: '#5D4037',
      light: '#A1887F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C49A6C',
      dark: '#9C7550',
      light: '#E2C8A8',
      contrastText: '#2F211B',
    },
    background: {
      default: '#F8F5F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2F211B',
      secondary: '#6F625C',
    },
    success: {
      main: '#4F7A57',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

export default theme