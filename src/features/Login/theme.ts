import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto Condensed',
          height: 76,
          fontWeight: 400,
          fontSize: 24,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#000',
          textAlign: 'left',
          fontFamily: 'Roboto Condensed',
          fontWeight: 600,
          fontSize: 26,
          lineHeight: '30px',
          marginBottom: 11,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              minWidth: 180,
              color: '#fff',
              fontFamily: 'Poppins',
              fontSize: 24,
              border: 0,
              borderRadius: 0,
              backgroundColor: '#000',
            }),
        }),
      },
    },
  },
});
