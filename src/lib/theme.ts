// imports
import { createTheme } from '@mui/material/styles';

const primaryColor = "#2563eb";

const lightPalette = {
  background: {
    default: '#f1f1f1',
    paper: '#ffffff',
  },
  text: {
    primary: '#222222',
  },
  primary: {
    main: primaryColor,
  },
};

const darkPalette = {
  background: {
    default: '#222222',
    paper: '#333333',
  },
  text: {
    primary: '#ffffff',
  },
  primary: {
    main: primaryColor,
  },
};

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark' ? darkPalette : lightPalette),
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: mode === 'dark' ? '#444' : '#fff',
              color: mode === 'dark' ? '#fff' : '#000',
              borderRadius: '8px',

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' ? '#90caf9' : primaryColor,
              },
            },

            '& label.Mui-focused': {
              color: mode === 'dark' ? '#90caf9' : primaryColor,
            },

            '& label': {
              color: mode === 'dark' ? '#aaa' : '#333',
            },
          },
        },
      },
    },
  });
