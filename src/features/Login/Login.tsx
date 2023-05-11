import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';

import { Logo } from '../../styles/common';
import { useSignin } from './hooks/useSignin';
import { Description, Form, Layout } from './styled';
import { theme } from './theme';

export const Login = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSuccess = () => {
    navigate('/contacts');
  };

  const { signin, isLoading } = useSignin(handleSuccess);

  const handleSubmit = () => {
    signin({ login, password });
  };

  const handlePasswordChange = () => {
    setIsVisible((state) => !state);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Form>
          <Grid item xs={12}>
            <Logo>LOGO</Logo>
          </Grid>
          <Grid item xs={12}>
            <Description>Welcome To CRM System Sign In To Your Account</Description>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputLabel>Login</InputLabel>
              <OutlinedInput fullWidth margin="dense" value={login} onChange={(e) => setLogin(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton color="inherit" onClick={handlePasswordChange}>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                }
                margin="dense"
                type={!isVisible ? 'password' : 'text'}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading || !login || !password}
              >
                sign in
              </Button>
            </Grid>
          </Grid>
        </Form>
      </ThemeProvider>
    </Layout>
  );
};
