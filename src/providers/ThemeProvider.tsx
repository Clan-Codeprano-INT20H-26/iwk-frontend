import type { PropsWithChildren } from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { defaultPalette } from '../styles/palette';
import { defaultTypography } from '../styles/typography';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const defaultTheme = createTheme({
    palette: defaultPalette,
    typography: defaultTypography,
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
      },
    },
  });

  return <MUIThemeProvider theme={defaultTheme}>{children}</MUIThemeProvider>;
};
