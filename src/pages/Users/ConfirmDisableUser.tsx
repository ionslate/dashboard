import { useQueryClient } from 'react-query';
import { useUserSearch } from '.';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { toast } from '../../components/Toaster/ToastService';
import { queryErrorHandler } from '../../utils/queryErrorHandler';
import { useDisableUserMutation } from '../../__generated__';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

export interface ConfirmDisableUserProps {
  open: boolean;
  onClose: () => void;
  username: string;
  userId: string;
}

export function ConfirmDisableUser({
  open,
  onClose,
  username,
  userId,
}: ConfirmDisableUserProps) {
  const userSearch = useUserSearch();

  const queryClient = useQueryClient();
  const { mutate: disableUser } = useDisableUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
      toast.success('User Disabled');
    },
    onError: queryErrorHandler,
  });
  return (
    <ConfirmModal
      title="Confirm Disable User"
      description={`Are you sure you want to disable ${username}?`}
      open={open}
      confirmColor="pink"
      confirmText="Yes, Disable"
      onClose={onClose}
      onConfirm={() => disableUser({ userId })}
    />
  );
}
