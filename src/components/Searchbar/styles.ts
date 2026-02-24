import { styled } from '@mui/material/styles';
import InputBase, { type InputBaseProps } from '@mui/material/InputBase';
import Box, { type BoxProps } from '@mui/material/Box';

export const SearchContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  borderRadius: 42,
  marginLeft: 0,
  width: theme.spacing(35),
  height: theme.spacing(5),
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.grey[900]}`,

  '& svg': {
    width: 18,
    height: 18,
  },
}));

export const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

export const StyledInputBase = styled(InputBase)<InputBaseProps>(
  ({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.grey[700],
    flex: 1,

    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      width: '100%',
    },
  })
);
