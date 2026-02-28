import type { CSSProperties } from '@mui/material/styles';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from '@tanstack/react-router';

interface LinkProps extends RouterLinkProps {
  style?: CSSProperties;
}

export const Link = (props: LinkProps) => {
  return <RouterLink className="link" {...props} />;
};
