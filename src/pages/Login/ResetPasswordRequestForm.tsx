import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

const resetPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

const defaultValues = { email: '' };

interface ResetPasswordFormProps {
  onSubmit: (request: { email: string }) => void;
  onClose: () => void;
  loading?: boolean;
}

export default function ResetPasswordRequestForm({
  onSubmit,
  onClose,
  loading,
}: ResetPasswordFormProps) {
  const {
    register,
    formState: { errors },
    setFocus,
    handleSubmit,
  } = useForm({ defaultValues, resolver: yupResolver(resetPasswordSchema) });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <TextField
          label="email"
          id="email"
          required
          fullWidth
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          className="mr-4"
          variant="open"
          type="button"
          disabled={loading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button color="green" type="submit" loading={loading}>
          Reset Password
        </Button>
      </div>
    </form>
  );
}
