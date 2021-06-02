import { useQueryClient } from 'react-query';
import { useUserSearch } from '.';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { toast } from '../../components/Toaster/ToastService';
import { queryErrorHandler } from '../../utils/queryErrorHandler';
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
  const userSearch = useUserSearch();

  const queryClient = useQueryClient();
  const { mutate: disableUser } = useRemoveUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
      toast.success('User Deleted');
    },
    onError: queryErrorHandler,
  });
  return (
    <ConfirmModal
      title="Confirm Delete User"
      description={`Are you sure you want to delete ${username}?`}
      confirmText="Yes, Delete"
      open={open}
      confirmColor="red"
      onClose={onClose}
      onConfirm={() => disableUser({ userId })}
    />
  );
}
