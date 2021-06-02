import { useState } from 'react';
import Modal from '../../components/Modal';
import { toast } from '../../components/Toaster/ToastService';
import { linkMixin } from '../../mixins';
import { classes } from '../../utils';
import { queryErrorHandler } from '../../utils/queryErrorHandler';
import { useResetPasswordRequestMutation } from '../../__generated__';
import ResetPasswordRequestForm from './ResetPasswordRequestForm';

export default function ResetPasswordRequestModal() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  const {
    mutate: resetPasswordRequest,
    isLoading,
  } = useResetPasswordRequestMutation({
    onSuccess: () => {
      handleClose();
      toast.success('Email Sent');
    },
    onError: queryErrorHandler,
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
        onClose={() => {
          handleClose();
        }}
        title="Reset Password"
        description="Enter your email below, and we'll send you a link to reset your password."
      >
        <ResetPasswordRequestForm
          onSubmit={resetPasswordRequest}
          onClose={handleClose}
          loading={isLoading}
        />
      </Modal>
    </>
  );
}
