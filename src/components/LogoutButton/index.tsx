import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  useLogoutMutation,
  UserQuery,
  useUserQuery,
} from '../../__generated__';
import Button from '../Button';

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: null,
      });
      queryClient.removeQueries(useUserQuery.getKey({}));
      history.push('/login');
    },
  });

  return (
    <Button color="green" onClick={() => logout({})}>
      Logout
    </Button>
  );
}
