import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type AuthContainerProp = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const AuthContainer = ({
  title,
  description,
  children,
  footer,
}: AuthContainerProp) => (
  <Stack
    gap="48px"
    sx={{
      margin: '10% auto',
      position: 'relative',
      alignItems: 'flex-start',
    }}
  >
    <Stack gap="16px">
      <Typography variant="h3">{title}</Typography>
      {description && (
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      )}
    </Stack>
    <Stack
      gap="24px"
      sx={{
        maxWidth: '400px',
        width: '100%',
      }}
    >
      {children}
      {footer}
    </Stack>
  </Stack>
);
