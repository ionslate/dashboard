import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { BiErrorCircle } from 'react-icons/bi';
import * as yup from 'yup';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Message from '../../components/Message';
import TextField from '../../components/TextField';
import Toggle from '../../components/Toggle';
import { classes, ValidationError } from '../../utils';
import { User, UserAdminRequest, UserRole } from '../../__generated__';

const userSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be longer than 4 characters')
    .max(32, 'Username cannot be longer than 32 characters')
    .matches(
      /^([a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*)+$/,
      'Username can only consist of numbers and uppercase/lowercase letters',
    )
    .trim(),
  email: yup
    .string()
    .email('Must provide a valid email')
    .required('Email is required')
    .trim(),
  requirePassword: yup.boolean().required(),
  password: yup
    .string()
    .when(
      'requirePassword',
      (
        requirePassword: boolean,
        schema: yup.StringSchema<string | undefined, Record<string, unknown>>,
      ) => {
        return requirePassword
          ? schema
              .required('Password is required when "Set Password?" is enabled')
              .min(8, 'Password must be at least 8 characters long')
          : schema.notRequired();
      },
    ),
  confirmPassword: yup
    .string()
    .when(
      'requirePassword',
      (
        requirePassword: boolean,
        schema: yup.StringSchema<string | undefined, Record<string, unknown>>,
      ) =>
        requirePassword
          ? schema
              .required(
                'Confirm password is required when "Set Password?" is enabled',
              )
              .oneOf([yup.ref('password')], 'Passwords do not match')
          : schema.notRequired(),
    ),
  roles: yup
    .object({
      USER: yup.boolean(),
      USER_ADMIN: yup.boolean(),
      CONTENT_MANAGER: yup.boolean(),
      CONTENT_PUBLISHER: yup.boolean(),
    })
    .test('is-atleast-one', 'At least one role must be selected', (value) =>
      Object.values(value).some((role) => !!role),
    ),
});

function getDefaultValues(user?: User) {
  const defaultValues = {
    username: '',
    email: '',
    requirePassword: false,
    password: '',
    confirmPassword: '',
    roles: {
      USER: false,
      USER_ADMIN: false,
      CONTENT_MANAGER: false,
      CONTENT_PUBLISHER: false,
    },
  };

  if (!user) {
    return defaultValues;
  }

  const roles = Object.fromEntries(user.roles.map((role) => [role, true]));

  return {
    ...defaultValues,
    ...user,
    roles: { ...defaultValues.roles, ...roles },
  };
}

export interface UserFormProps {
  user?: User;
  onSubmit: (user: UserAdminRequest, logUserOut?: boolean) => void;
  resetApiError?: () => void;
  validationError?: ValidationError;
  loading?: boolean;
}

export default function UserForm({
  user,
  onSubmit,
  resetApiError,
  validationError,
  loading,
}: UserFormProps) {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: getDefaultValues(user),
    resolver: yupResolver(userSchema),
  });
  const [logUserOut, setLogUserOut] = useState(false);

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  useEffect(() => {
    if (validationError) {
      setFocus(validationError.field as 'username' | 'email');
    }
  }, [validationError, setFocus]);

  const { onChange: usernameOnChange, ...usernameRegister } = register(
    'username',
  );
  const { onChange: emailOnChange, ...emailRegister } = register('email');

  return (
    <form
      className="flex flex-col h-full"
      onSubmit={handleSubmit((values) =>
        onSubmit(
          {
            username: values.username,
            email: values.email,
            roles: Object.entries(values.roles)
              .filter(([role, value]) => !!value)
              .map(([role]) => role) as UserRole[],
            password: values.password,
          },
          logUserOut,
        ),
      )}
    >
      <div className="flex-1">
        <div>
          <TextField
            label="username"
            tooltip="Username can consist of uppercase letters, lowercase letters, and numbers, and must be between 4 and 32 characters in length"
            required
            id="create-edit-username"
            className="mb-2"
            error={
              (validationError?.field === 'username' &&
                validationError.message) ||
              errors.username?.message
            }
            {...usernameRegister}
            onChange={(e) => {
              usernameOnChange(e);
              if (validationError?.field === 'username') {
                resetApiError?.();
              }
            }}
          />
        </div>
        <div>
          <TextField
            label="email"
            required
            id="create-edit-email"
            className="mb-2"
            error={
              (validationError?.field === 'email' && validationError.message) ||
              errors.email?.message
            }
            {...emailRegister}
            onChange={(e) => {
              emailOnChange(e);
              if (validationError?.field === 'email') {
                resetApiError?.();
              }
            }}
          />
        </div>
        <div className="mb-4">
          <fieldset
            className={classes(
              'border-2 rounded p-3',
              errors.roles ? 'border-red-600' : 'border-gray-500',
            )}
            aria-required
            aria-invalid={!!errors.roles}
          >
            <legend className="text-sm uppercase font-bold px-2 text-gray-400">
              Roles
            </legend>
            <Checkbox
              id="user-role"
              label="User"
              className="mb-1"
              {...register('roles.USER')}
            />
            <Checkbox
              id="user-admin-role"
              label="User Admin"
              className="mb-1"
              {...register('roles.USER_ADMIN')}
            />
            <Checkbox
              id="content-manager-role"
              label="Content Manager"
              className="mb-1"
              {...register('roles.CONTENT_MANAGER')}
            />
            <Checkbox
              id="content-publisher-role"
              label="Content Publisher"
              {...register('roles.CONTENT_PUBLISHER')}
            />
          </fieldset>
          <ErrorMessage
            errors={errors}
            name="roles"
            render={({ message }) => (
              <div className="flex items-center mt-1" role="alert">
                <IconContext.Provider
                  value={{ className: 'mr-2 text-red-500' }}
                >
                  <BiErrorCircle />
                </IconContext.Provider>
                <span className="text-red-500 text-sm flex-1">{message}</span>
              </div>
            )}
          />
        </div>
        <Controller
          control={control}
          name="requirePassword"
          render={({ field }) => (
            <Toggle
              checked={field.value}
              onChange={field.onChange}
              className="mb-2"
              label="Set Password?"
            />
          )}
        />
        <div>
          <TextField
            label="password"
            id="create-edit-password"
            className="mb-2"
            tooltip="Password must be at least 8 characters long"
            type="password"
            disabled={!watch().requirePassword}
            required={watch().requirePassword}
            error={errors.password?.message}
            {...register('password')}
          />
          <TextField
            label="confirm password"
            id="confirm-create-edit-password"
            className="mb-2"
            type="password"
            disabled={!watch().requirePassword}
            required={watch().requirePassword}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Message
            type="warn"
            className="mt-4"
            active={!!user && watch().requirePassword}
          >
            Setting the password will log the user out.
          </Message>
          {!!user && (
            <Toggle
              disabled={watch().requirePassword}
              checked={logUserOut}
              onChange={setLogUserOut}
              className="mb-2 mt-8"
              label="Logout User?"
            />
          )}
        </div>
      </div>
      <Button type="submit" color="green" loading={loading} fullWidth>
        Save
      </Button>
    </form>
  );
}
