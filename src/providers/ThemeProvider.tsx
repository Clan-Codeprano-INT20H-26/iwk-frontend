import type { PropsWithChildren } from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { defaultPalette } from '../styles/palette';
import { defaultTypography } from '../styles/typography';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const defaultTheme = createTheme({
    palette: defaultPalette,
    typography: defaultTypography,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        xxl: 2000,
      },
    },
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
