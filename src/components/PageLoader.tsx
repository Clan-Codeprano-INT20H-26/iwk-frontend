import Backdrop from '@mui/material/Backdrop';
import { Loader } from './ui/Loader';

interface PageLoaderProps {
  open?: boolean;
}

export const PageLoader = ({ open = true }: PageLoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Loader size={120} />
    </Backdrop>
  );
};
