import { css } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const globalStyle = (theme: Theme) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0 100px #fff;
    outline: none;
  }
`;
