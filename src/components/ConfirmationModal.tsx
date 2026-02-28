import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { IconButton } from './ui/IconButton';
import { ContainedButton, OutlinedButton } from './ui/Button';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onAction: () => void;
  cancelText?: string;
  actionText?: string;
}

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    position: 'relative',
    flexDirection: 'column',
    gap: '36px',
    minWidth: '650px',
    padding: '32px',
  },
});

export const ConfirmationModal = ({
  open,
  title,
  description,
  onClose,
  onAction,
  cancelText = 'Cancel',
  actionText = 'Done',
}: ConfirmationModalProps) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
        color="secondary"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 3, justifyContent: 'center' }}>
        <OutlinedButton size="large" onClick={onClose} sx={{ width: '200px' }}>
          {cancelText}
        </OutlinedButton>
        <ContainedButton
          size="large"
          onClick={onAction}
          sx={{ width: '200px' }}
        >
          {actionText}
        </ContainedButton>
      </DialogActions>
    </StyledDialog>
  );
};
