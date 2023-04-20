import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          display: 'flex',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '4px 12px',
        },
        head: {
          paddingRight: 0,
        },
      },
    },
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
  },
});
