import { useQueryClient } from 'react-query';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useAppSelector } from '../../utils/reduxHooks';
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
  const userSearch = useAppSelector((state) => state.userSearch);

  const queryClient = useQueryClient();
  const { mutate: disableUser } = useDisableUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
    },
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
