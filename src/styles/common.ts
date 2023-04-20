import { styled } from '@mui/material';

export const Logo = styled('div')(({ theme }) => ({
  fontFamily: 'Inter',
  fontSize: 64,
  lineHeight: '78px',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  textAlign: 'center',
  margin: theme.spacing(5, 'auto'),
}));
