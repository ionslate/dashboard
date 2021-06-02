import Modal from '../../components/Modal';
import { useChangePasswordMutation } from '../../__generated__';
import ChangePasswordForm from './ChangePasswordForm';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  function handleClose() {
    onClose();
    reset();
  }

  const { mutate, error, reset, isLoading } = useChangePasswordMutation({
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Modal title="Change Password" open={open} onClose={handleClose}>
      <ChangePasswordForm
        onSubmit={(request) => {
          mutate({ request });
        }}
        onCancel={handleClose}
        validationError={
          error?.code === 403 ? { message: 'Incorrect Password' } : undefined
        }
        resetApiError={reset}
        loading={isLoading}
      />
    </Modal>
  );
}
