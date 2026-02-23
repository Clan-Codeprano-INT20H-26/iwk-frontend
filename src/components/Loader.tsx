import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
  open?: boolean;
}

export const Loader = ({ open = true }: LoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={120}
        sx={{
          '& .MuiCircularProgress-circle': {
            stroke: 'url(#my_gradient)',
          },
        }}
      />
    </Backdrop>
  );
};
