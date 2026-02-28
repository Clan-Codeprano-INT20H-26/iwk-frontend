import Backdrop from '@mui/material/Backdrop';
import { Loader } from './ui/Loader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface PageLoaderProps {
  open?: boolean;
  title?: string;
}

export const PageLoader = ({ open = true, title }: PageLoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Stack alignItems="center" gap={6}>
        <Loader size={150} />
        {title && (
          <Typography variant="h4" color="primary.light">
            {title}
          </Typography>
        )}
      </Stack>
    </Backdrop>
  );
};
