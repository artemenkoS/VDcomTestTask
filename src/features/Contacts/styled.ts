import { styled } from '@mui/material';

export const CellText = styled('div')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const EditContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 0),
}));

export const RouteTitle = styled('div')(() => ({
  fontFamily: 'Poppins',
  fontSize: '32px',
}));

export const PaginationLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3, 0),
}));

export const PreloaderWrap = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

export const AddContactButton = styled('button')(() => ({
  width: '141px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#EDBC4A',
  boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Poppins',
  fontSize: '20px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  alignSelf: 'flex-end',
}));
