import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUserSearch } from '.';
import Button from '../../components/Button';
import SidePanel from '../../components/SidePanel';
import { toast } from '../../components/Toaster/ToastService';
import { queryErrorHandler } from '../../utils/queryErrorHandler';
import { useAdminCreateUserMutation } from '../../__generated__';
import UserForm from './UserForm';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

export default function CreateUser() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const userSearch = useUserSearch();

  const queryClient = useQueryClient();
  const { mutate, error, reset, isLoading } = useAdminCreateUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
      setIsUserModalOpen(false);
      toast.success('User Created');
    },
    onError: queryErrorHandler,
  });

  function handleClose() {
    setIsUserModalOpen(false);
    reset();
  }

  return (
    <>
      <Button
        color="pink"
        className="w-32"
        onClick={() => setIsUserModalOpen(true)}
      >
        Create User
      </Button>
      <SidePanel
        title="Create User"
        open={isUserModalOpen}
        onClose={handleClose}
      >
        <UserForm
          onSubmit={(request) => {
            mutate({ request });
          }}
          validationError={error?.validationError}
          resetApiError={reset}
          loading={isLoading}
        />
      </SidePanel>
    </>
  );
}
