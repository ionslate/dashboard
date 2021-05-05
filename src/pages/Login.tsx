import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { DataError } from '../utils/fetcher';
import { useLoginMutation, UserQuery, useUserQuery } from '../__generated__';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  const { mutate: login, error, isError } = useLoginMutation<DataError>({
    onSuccess: (res) => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: res.login,
      });
      if (redirect) {
        history.push(redirect);
      } else {
        history.push('/');
      }
    },
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirect = queryParams.get('redirect');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login({ request: { username, password } });
      }}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {isError && (
        <div>
          {error?.code === 401
            ? 'Invalid username or password'
            : 'Unknown error, please try again'}
        </div>
      )}
    </form>
  );
}
