import MUIButton, { type ButtonProps } from '@mui/material/Button';

export const Button = ({ sx, ...props }: ButtonProps) => {
  return <MUIButton sx={{ textTransform: 'none', ...sx }} {...props} />;
};
