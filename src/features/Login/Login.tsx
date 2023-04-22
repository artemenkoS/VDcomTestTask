import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';

import { Logo } from '../../styles/common';
import { Description, Form, Layout } from './styled';
import { theme } from './theme';
import { IUser } from '../../types';

type Props = {
  onSuccess(data: IUser): void;
};

interface IAuth {
  login: string;
  password: string;
}

const signin = async (data: IAuth): Promise<IUser> => {
  const response = await fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const Login = (props: Props) => {
  const { mutate, isLoading } = useMutation<IUser, {}, IAuth>(signin, {
    onSuccess: (data) => {
      props.onSuccess(data);
    },
    onError: () => {
      alert('there was an error');
    },
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    mutate({ login, password });
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
