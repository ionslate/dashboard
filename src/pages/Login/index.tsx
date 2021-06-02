import { useQueryClient } from 'react-query';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider';
import Button from '../../components/Button';
import Message from '../../components/Message';
import TextField from '../../components/TextField';
import { useLoginMutation, UserQuery, useUserQuery } from '../../__generated__';
import ResetPasswordRequestModal from './ResetPasswordRequestModal';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const defaultValues = {
  username: '',
  password: '',
};

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  const { mutate: login, error, isError, isLoading } = useLoginMutation({
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
      setFocus('username');
    },
  });

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
            onSubmit={handleSubmit(({ username, password }) => {
              login({ request: { username, password } });
            })}
          >
            <div className="mb-4">
              <TextField
                label="username"
                id="username"
                fullWidth
                error={errors.username?.message}
                {...register('username')}
              />
            </div>
            <div className={isError ? 'mb-4' : 'mb-8'}>
              <TextField
                label="password"
                id="password"
                type="password"
                fullWidth
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
            <div>
              <Button type="submit" color="green" fullWidth loading={isLoading}>
                Login
              </Button>
              <Message type="error" className="mt-4" active={isError}>
                {error?.code === 401
                  ? 'Invalid username or password'
                  : 'Unknown error, please try again'}
              </Message>
            </div>
          </form>
          <ResetPasswordRequestModal />
        </div>
      </div>
    </div>
  );
}
