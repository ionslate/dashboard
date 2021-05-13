import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider';
import Button from '../../components/Button';
import Message from '../../components/Message';
import TextField from '../../components/TextField';
import { DataError } from '../../utils';
import { useLoginMutation, UserQuery, useUserQuery } from '../../__generated__';
import ResetPasswordRequest from './ResetPasswordRequest';

export default function Login() {
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  const {
    mutate: login,
    error,
    isError,
    isLoading,
  } = useLoginMutation<DataError>({
    onSuccess: (res) => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: res.login,
      });
      setTimeout(() => {
        if (redirect) {
          history.push(redirect);
        } else {
          history.push('/');
        }
      }, 0);
    },
    onError: () => {
      usernameInputRef.current?.focus();
    },
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useAuth();

  const redirect = queryParams.get('redirect');

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container flex flex-row justify-center items-center h-full mx-auto">
      <div className="bg-gray-800 shadow-xl rounded mb-4 w-[400px] h-[fit-content] border-t-4 border-pink-500">
        <div className="shadow-inner px-8 pt-6 pb-8">
          <div className="mb-8">
            <h1 className="text-gray-100 text-5xl">Ion Slate</h1>
            <span className="text-indigo-400 text-xl">Dashboard</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ request: { username, password } });
            }}
          >
            <div className="mb-4">
              <TextField
                label="username"
                id="username"
                name="username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </div>
            <div className={isError ? 'mb-4' : 'mb-8'}>
              <TextField
                label="password"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              {isError && (
                <Message type="error" className="mb-4">
                  {error?.code === 401
                    ? 'Invalid username or password'
                    : 'Unknown error, please try again'}
                </Message>
              )}
              <Button type="submit" color="green" fullWidth loading={isLoading}>
                Login
              </Button>
            </div>
          </form>
          <ResetPasswordRequest />
        </div>
      </div>
    </div>
  );
}
