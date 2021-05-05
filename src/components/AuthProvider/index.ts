import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { fetcher } from '../../utils/fetcher';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  useLoginMutation,
  User,
  UserQuery,
  useUserQuery,
} from '../../__generated__';

const AUTH_KEY = 'auth-key';

export default function AuthProvider() {
  const queryClient = useQueryClient();

  const { data: user, error, status, refetch } = useUserQuery<UserQuery, Error>(
    undefined,
    {
      queryKey: AUTH_KEY,
    },
  );

  const { mutate: login } = useLoginMutation({
    onSuccess: (result) => {
      queryClient.setQueryData(AUTH_KEY, result.login);
    },
  });

  const setUser = useCallback(
    (user?: User) => queryClient.setQueryData(AUTH_KEY, user),
    [queryClient],
  );

  // const login = useCallback(
  //   (username: string, password: string) =>
  //     fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, {
  //       request: { username, password },
  //     })().then((data) => setUser(data.login)),
  //   [setUser],
  // );

  const logout = useCallback(
    () =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
      )().then(() => setUser(undefined)),
    [setUser],
  );
}
