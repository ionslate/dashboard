import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { DataError } from '../utils/fetcher';
import { useLoginMutation, UserQuery, useUserQuery } from '../__generated__';

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
      if (redirect) {
        history.push(redirect);
      } else {
        history.push('/');
      }
    },
    onError: () => {
      usernameInputRef.current?.focus();
    },
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirect = queryParams.get('redirect');

  return (
    <div className="container flex flex-row justify-center items-center h-full mx-auto">
      <div className="bg-gray-800 shadow-lg rounded mb-4 min-w-[400px] h-[fit-content] border-t-4 border-pink-500">
        <div className="shadow-inner px-8 pt-6 pb-8">
          <div>
            <div className="mb-8">
              <h1 className="text-gray-100 text-5xl">Ion Slate</h1>
              <span className="text-indigo-400 text-xl">Dashboard</span>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ request: { username, password } });
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-400 text-sm font-bold uppercase tracking-widest"
              >
                Username
              </label>
              <div className="shadow-sm">
                <input
                  autoFocus
                  ref={usernameInputRef}
                  id="username"
                  name="username"
                  className="shadow-inner appearance-none border-2 border-gray-600 border-opacity-60 rounded w-full py-2 px-3 text-gray-100 bg-black bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-bold uppercase tracking-widest"
              >
                Password
              </label>
              <div className="shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="shadow-inner appearance-none border-2 border-gray-600 border-opacity-60 rounded w-full py-2 px-3 text-gray-100 bg-black bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              {isError && (
                <div className="bg-red-700 p-4 rounded shadow bg-opacity-60 w-full">
                  <p className="text-red-200 italic">
                    {error?.code === 401
                      ? 'Invalid username or password'
                      : 'Unknown error, please try again'}
                  </p>
                </div>
              )}
              {isLoading ? (
                <div className="flex justify-center items-center w-full">
                  <div className="border-l-gray-700 border-t-gray-700 border-b-gray-700 border-r-green-500 border-4 rounded-full w-10 h-10 animate-spin" />
                </div>
              ) : (
                <Button type="submit" color="green" className="mt-4">
                  Login
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
