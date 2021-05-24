import { useQueryClient } from 'react-query';
import Modal from '../../components/Modal';
import { useAdminCreateUserMutation, User } from '../../__generated__';
import UserForm from './UserForm';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

export interface UserModalProps {
  user?: User;
  open: boolean;
  onClose: () => void;
}

export default function UserModal({ user, open, onClose }: UserModalProps) {
  const queryClient = useQueryClient();
  const { mutate, error, reset, isLoading } = useAdminCreateUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(useUserListInfiniteQuery.queryPrefix);
      onClose();
    },
  });

  function handleClose() {
    onClose();
    reset();
  }

  return (
    <Modal title="Create User" open={open} onClose={handleClose}>
      <UserForm
        user={user}
        onSubmit={(request) => {
          mutate({ request });
        }}
        onCancel={handleClose}
        validationError={error?.validationError}
        resetApiError={reset}
        loading={isLoading}
      />
    </Modal>
  );
}
