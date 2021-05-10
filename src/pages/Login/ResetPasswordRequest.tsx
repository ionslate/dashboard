import { useRef, useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import { linkMixin } from '../../mixins';
import { classes } from '../../utils';
import { useResetPasswordRequestMutation } from '../../__generated__';

export default function ResetPasswordRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const emailTextFieldRef = useRef<HTMLInputElement>(null);

  const {
    mutate: resetPasswordRequest,
    isLoading,
  } = useResetPasswordRequestMutation({
    onSuccess: () => {
      setEmail('');
      setIsOpen(false);
    },
  });

  return (
    <>
      <button
        className={classes(linkMixin(), 'mt-4')}
        onClick={() => setIsOpen(true)}
      >
        Forgot Password?
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Reset Password"
        initialFocus={emailTextFieldRef}
      >
        <div className="mb-8">
          <TextField
            label="email"
            id="email"
            name="email"
            value={email}
            ref={emailTextFieldRef}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button
            className="mr-4"
            variant="open"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="green"
            onClick={() => resetPasswordRequest({ email })}
            loading={isLoading}
          >
            Reset Password
          </Button>
        </div>
      </Modal>
    </>
  );
}
