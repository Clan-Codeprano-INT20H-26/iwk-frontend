import type { FC } from 'react';
import { BaseButton } from './BaseButton';
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import type { ButtonPropsWithoutVariant } from './types';
import { styled } from '@mui/material/styles';

const StyledTextButton = styled(BaseButton)<MUIButtonProps>(
  ({ size = 'medium' }) => ({
    ...(size === 'small' && {
      padding: '4px 5px',
    }),
    ...(size === 'medium' && {
      padding: '6px 8px',
    }),
    ...(size === 'large' && {
      padding: '8px 11px',
    }),
  })
);

export const TextButton: FC<ButtonPropsWithoutVariant> = (props) => {
  return <StyledTextButton variant="text" {...props} />;
};
