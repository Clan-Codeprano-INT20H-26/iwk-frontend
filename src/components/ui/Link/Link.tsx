import './styles.css';
import { Link as RouterLink, type LinkProps } from '@tanstack/react-router';

export const Link = (props: LinkProps) => {
  return <RouterLink className="link" {...props} />;
};
