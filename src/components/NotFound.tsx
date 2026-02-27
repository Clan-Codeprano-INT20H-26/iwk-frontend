import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from '@tanstack/react-router';
import { headerHeight } from '@/constants/headerHeight';
import { ContainedButton, OutlinedButton } from './ui/Button';
import { Header } from './Header';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header currentPage="404" />
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: `calc(100vh - ${headerHeight})`,
          position: 'relative',
        }}
      >
        <Stack gap={3} sx={{ position: 'absolute', left: { lg: 90, xl: 200 } }}>
          <Typography variant="h2">Error 404</Typography>
          <Typography variant="body1">
            Oops! We couldn't find the page you were looking for.
          </Typography>
          <Stack direction="row" gap={2}>
            <OutlinedButton
              size="large"
              sx={{ px: 5 }}
              onClick={() => navigate({ to: '/' })}
            >
              Home
            </OutlinedButton>
            <ContainedButton
              size="large"
              sx={{ px: 5 }}
              onClick={() => history.back()}
            >
              Go back
            </ContainedButton>
          </Stack>
        </Stack>
        <img
          src="/not-found.png"
          alt="Not Found"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            maxWidth: 1100,
          }}
          width="55%"
          height="100%"
        />
      </Stack>
    </>
  );
};
