import { useQueryClient } from 'react-query';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useAppSelector } from '../../utils/reduxHooks';
import { useRemoveUserMutation } from '../../__generated__';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

export interface ConfirmRemoveUserProps {
  open: boolean;
  onClose: () => void;
  username: string;
  userId: string;
}

export function ConfirmRemoveUser({
  open,
  onClose,
  username,
  userId,
}: ConfirmRemoveUserProps) {
  const userSearch = useAppSelector((state) => state.userSearch);

  const queryClient = useQueryClient();
  const { mutate: disableUser } = useRemoveUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
    },
  });
  return (
    <ConfirmModal
      title="Confirm Delete User"
      description={`Are you sure you want to delete ${username}?`}
      confirmText="Yes, Delete"
      open={open}
      confirmColor="red"
      onCancel={onClose}
      onConfirm={() => {
        disableUser({ userId });
        onClose();
      }}
    />
  );
}
