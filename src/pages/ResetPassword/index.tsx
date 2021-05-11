import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Message from '../../components/Message';
import TextField from '../../components/TextField';
import { linkMixin } from '../../mixins';
import { classes } from '../../utils';
import {
  useResetPasswordMutation,
  UserQuery,
  useUserQuery,
} from '../../__generated__';

export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const resetId = queryParams.get('id');

  const history = useHistory();

  const queryClient = useQueryClient();
  const {
    mutate: resetPassword,
    isError,
    isLoading,
  } = useResetPasswordMutation({
    onSuccess: (res) => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: res.resetPassword,
      });
      history.push('/');
    },
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!resetId) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container flex flex-row justify-center items-center h-full mx-auto">
      <div className="bg-gray-800 shadow-xl rounded mb-4 w-[400px] h-[fit-content] border-l-4 border-blue-400 border-opacity-40">
        <div className="shadow-inner px-8 pt-6 pb-8">
          <div className="mb-6">
            <h1 className="text-gray-100 text-5xl">Ion Slate</h1>
            <span className="text-indigo-400 text-xl">Dashboard</span>
          </div>
          <hr />
          <div className="my-4">
            <h2 className="text-gray-100 text-xl">Reset Password</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword({ resetId, password });
            }}
          >
            <div className="mb-4">
              <TextField
                label="password"
                id="password"
                name="password"
                type="password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            <div className={isError ? 'mb-4' : 'mb-8'}>
              <TextField
                label="confirm password"
                id="confirm password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              {isError && (
                <Message type="error" className="mb-4">
                  Unable to reset password. Link is either invalid or expired.
                </Message>
              )}
              <Button type="submit" color="green" fullWidth loading={isLoading}>
                Submit
              </Button>
            </div>
          </form>
          <Link
            to="/login"
            className={classes(linkMixin(), 'block mt-4 w-[fit-content]')}
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
