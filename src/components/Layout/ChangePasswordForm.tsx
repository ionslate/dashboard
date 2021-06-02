import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { ValidationError } from '../../utils';
import { ChangePasswordRequest } from '../../__generated__';

const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),
  confirmNewPassword: yup
    .string()
    .required('Confirm new password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export interface ChangePasswordFormProps {
  onSubmit: (request: ChangePasswordRequest) => void;
  onCancel: () => void;
  resetApiError?: () => void;
  validationError?: ValidationError;
  loading?: boolean;
}

export default function ChangePasswordForm({
  onSubmit,
  onCancel,
  resetApiError,
  validationError,
  loading,
}: ChangePasswordFormProps) {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    setFocus('oldPassword');
  }, [setFocus]);

  useEffect(() => {
    if (validationError) {
      setFocus('oldPassword');
    }
  }, [validationError, setFocus]);

  const { onChange: oldPasswordOnChange, ...oldPasswordRegister } = register(
    'oldPassword',
  );

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      )}
    >
      <div className="flex-1">
        <div>
          <TextField
            label="old password"
            required
            id="old-password"
            className="mb-2"
            type="password"
            error={validationError?.message || errors.oldPassword?.message}
            {...oldPasswordRegister}
            onChange={(e) => {
              oldPasswordOnChange(e);
              if (validationError) {
                resetApiError?.();
              }
            }}
          />
        </div>
        <div className="mt-6">
          <TextField
            label="new password"
            required
            id="new-password"
            className="mb-2"
            type="password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
        </div>
        <div>
          <TextField
            label="confirm new password"
            required
            id="confirm-new-password"
            className="mb-2"
            type="password"
            error={errors.confirmNewPassword?.message}
            {...register('confirmNewPassword')}
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-12">
        <Button
          type="button"
          variant="open"
          disabled={loading}
          className="mr-4"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" color="green" loading={loading}>
          Change Password
        </Button>
      </div>
    </form>
  );
}
