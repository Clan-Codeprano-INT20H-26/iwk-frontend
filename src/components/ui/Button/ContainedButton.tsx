import type { FC } from 'react';
import type { ButtonPropsWithoutVariant } from './types';
import { styled } from '@mui/material/styles';
import { BaseButton } from './BaseButton';
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';

const StyledContainedButton = styled(BaseButton)<MUIButtonProps>(
  ({ size = 'medium' }) => ({
    ...(size === 'small' && {
      padding: '4px 10px',
    }),
    ...(size === 'medium' && {
      padding: '6px 16px',
    }),
    ...(size === 'large' && {
      padding: '8px 22px',
    }),
  })
);

export const ContainedButton: FC<ButtonPropsWithoutVariant> = (props) => {
  return <StyledContainedButton variant="contained" {...props} />;
};
