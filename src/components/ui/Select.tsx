import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUISelect, { type SelectProps } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(MUISelect)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  '& .MuiSelect-select': {
    padding: '8px',
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.secondary,
    fontSize: '24px',
  },
}));

export const Select = ({ ...props }: SelectProps) => {
  return (
    <StyledSelect
      variant="outlined"
      IconComponent={ExpandMoreIcon}
      color="primary"
      sx={{ maxWidth: '150px' }}
      {...props}
    />
  );
};
