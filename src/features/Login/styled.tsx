import { styled } from '@mui/material';
import { alpha } from '@mui/material';

export const Layout = styled('div')(() => ({
  width: '100wh',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Form = styled('div')(() => ({
  width: 600,
  textAlign: 'center',
}));

export const Description = styled('div')(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: 36,
  color: alpha(theme.palette.text.primary, 0.9),
  marginBottom: theme.spacing(2),
}));
