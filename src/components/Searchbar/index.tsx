import SearchIcon from '@mui/icons-material/Search';
import { SearchContainer, StyledInputBase, SearchIconWrapper } from './styles';
import type { InputBaseProps } from '@mui/material/InputBase';

export const SearchBar = ({
  placeholder = 'Search',
  ...props
}: InputBaseProps) => {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder={placeholder} {...props} />
    </SearchContainer>
  );
};
