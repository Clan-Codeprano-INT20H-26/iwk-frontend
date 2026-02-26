import { useCart } from '@/lib/hooks/useCart';
import type { CartItem as CartItemProps } from '@/types/cartItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ContainedButton } from './ui/Button';
import { OutlinedButton } from './ui/Button';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

const StyledButtonGroup = styled(ButtonGroup)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  paddingTop: '5px',

  '& .MuiButton-root': {
    width: 25,
    height: 25,
    borderRadius: '50%',
    minWidth: 0,
    padding: 0,
    fontSize: '18px',
  },
});

const StyledDeleteButton = styled(OutlinedButton)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.error.main,
  fontSize: '24px',
  gap: 1,
  border: 'none',
  padding: 0,
  paddingLeft: '10px',
  borderRadius: 0,
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

export const CartItem = ({
  id,
  name,
  price,
  quantity,
  images,
  seller,
}: CartItemProps) => {
  const navigate = useNavigate();
  const { removeItem, decreaseQuantity, increaseQuantity } = useCart();
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const updatedPrice = price * quantity;

  const handleRemoveItem = () => {
    removeItem(id);
    setRemoveModalOpen(false);
  };

  return (
    <>
      <Stack sx={{ marginRight: '100px !important' }}>
        <Box>
          <Stack direction="row" spacing={4}>
            <Box sx={{ width: 223, height: 214, flexShrink: 0 }}>
              <img
                src={images[0]}
                width={223}
                height={214}
                alt={name}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate({ to: `/kits/${id}`, params: { kitId: id } })
                }
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                height: 214,
                flexGrow: 1,
              }}
            >
              <Stack spacing={0.5}>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="subtitle1" color="primary.main">
                  {seller}
                </Typography>
              </Stack>

              <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{ marginRight: 'auto' }}
              >
                <Typography variant="h4" color="primary.main">
                  ${updatedPrice}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={'20px'}
                  sx={{
                    paddingLeft: '237px',
                  }}
                >
                  <StyledButtonGroup size="small">
                    <ContainedButton
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        color: (theme) => theme.palette.grey[500],
                      }}
                      onClick={() => decreaseQuantity(id, quantity)}
                    >
                      -
                    </ContainedButton>
                    <Typography variant="body1">{quantity}</Typography>
                    <ContainedButton
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        color: (theme) => theme.palette.primary.main,
                      }}
                      onClick={() => increaseQuantity(id, quantity)}
                    >
                      +
                    </ContainedButton>
                  </StyledButtonGroup>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: '24px' }}
                  >
                    Quantity
                  </Typography>
                  <StyledDeleteButton
                    size="small"
                    onClick={() => setRemoveModalOpen(true)}
                  >
                    <DeleteIcon />
                    Delete
                  </StyledDeleteButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ margin: '60px 0' }} />
      </Stack>
      <DeleteConfirmationModal
        title="Are you sure you want to remove this kit from the cart?"
        description="Confirm to continue or cancel."
        open={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onDelete={handleRemoveItem}
        deleteText="Remove"
      />
    </>
  );
};
