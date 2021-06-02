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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from '../../components/Toaster/ToastService';

const resetPasswordSchema = yup.object({
  password: yup
    .string()

    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const defaultValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const resetId = queryParams.get('id');

  const history = useHistory();

  const queryClient = useQueryClient();
  const {
    mutate: resetPassword,
    isError,
    error,
    isLoading,
  } = useResetPasswordMutation({
    onSuccess: (res) => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: res.resetPassword,
      });
      history.push('/');
      toast.success('Password Changed');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(resetPasswordSchema) });

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
            onSubmit={handleSubmit(({ password }) => {
              resetPassword({ resetId, password });
            })}
          >
            <div className="mb-4">
              <TextField
                label="password"
                required
                id="password"
                type="password"
                autoFocus
                fullWidth
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
            <div className={isError ? 'mb-4' : 'mb-8'}>
              <TextField
                label="confirm password"
                id="confirm password"
                required
                type="password"
                fullWidth
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>
            <div>
              <Message type="error" className="mb-4" active={isError}>
                {error?.code === 401
                  ? 'Unable to reset password. Link is either invalid or expired.'
                  : 'Unknown error, please try again'}
              </Message>
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
