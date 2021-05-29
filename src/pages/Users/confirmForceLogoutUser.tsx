import { useQueryClient } from 'react-query';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useAppSelector } from '../../utils/reduxHooks';
import { useForceLogoutUserMutation } from '../../__generated__';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

export interface ConfirmForceLogoutUserProps {
  open: boolean;
  onClose: () => void;
  username: string;
  userId: string;
}

export function ConfirmForceLogoutUser({
  open,
  onClose,
  username,
  userId,
}: ConfirmForceLogoutUserProps) {
  const userSearch = useAppSelector((state) => state.userSearch);

  const queryClient = useQueryClient();
  const { mutate: disableUser } = useForceLogoutUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
    },
  });
  return (
    <ConfirmModal
      title="Confirm Logout User"
      description={`Are you sure you want to logout ${username}?`}
      open={open}
      confirmColor="pink"
      confirmText="Yes, Logout"
      onClose={onClose}
      onConfirm={() => disableUser({ userId })}
    />
  );
}
