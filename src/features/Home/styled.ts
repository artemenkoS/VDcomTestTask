import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material';

export const Layout = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'stretch',
  background: theme.palette.background.default,
}));

export const Sidebar = styled('div')(({ theme }) => ({
  height: '100vh',
  flex: '0 0 226px',
  background: theme.palette.background.paper,
  position: 'relative',
}));

export const ContentLayout = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const Header = styled('div')(({ theme }) => ({
  width: '100%',
  flex: '0 0 96px',
  background: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const Content = styled('div')(({ theme }) => ({
  width: '100%',
  flex: '1 1 100%',
  padding: theme.spacing(0, 3, 3),
}));

export const Search = styled('input')(({ theme }) => ({
  width: '522px',
  height: '50px',
  border: 'none',
  borderRadius: '6px',
  background: ` #F2F2F2 url('/search.svg') no-repeat ${theme.spacing(2)} center`,
  fontFamily: 'Roboto Condensed',
  fontSize: '20px',
  paddingLeft: theme.spacing(6),
  marginLeft: theme.spacing(4),
}));

export const RouteLink = styled(NavLink)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '16px',
  height: '54px',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  textDecoration: 'none',
  marginBottom: theme.spacing(1),
  borderLeft: '5px solid transparent',
  color: 'black',
  '&.active': {
    backgroundColor: 'rgba(237, 188, 74, 0.2);',
    borderLeftColor: '#EDBC4A',
  },
}));

export const UserWrapper = styled('div')(() => ({
  width: '200px',
  display: 'flex',
  alignItems: 'center',
}));

export const UserInfo = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontFamily: 'Poppins',
  fontSize: '22px',
}));

export const UserDescription = styled('div')(() => ({
  fontSize: '13px',
}));

export const LogOut = styled('div')(({ theme }) => ({
  fontSize: '24px',
  position: 'absolute',
  bottom: theme.spacing(5),
  padding: theme.spacing(2),
  textAlign: 'center',
  borderTop: `2px solid  black`,
  width: '100%',
}));
