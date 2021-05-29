import { useRef } from 'react';
import Modal from '.';
import Button from '../Button';

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  loading?: boolean;
  confirmColor?: 'red' | 'gray' | 'green' | 'pink';
}

export default function ConfirmModal({
  open,
  onConfirm,
  onClose,
  title,
  description,
  confirmText = 'Confirm',
  loading,
  confirmColor,
}: ConfirmModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      initialFocus={cancelButtonRef}
      description={description}
    >
      <div className="flex items-center justify-end">
        <Button
          variant="open"
          className="mr-4"
          onClick={onClose}
          disabled={loading}
          ref={cancelButtonRef}
        >
          Cancel
        </Button>
        <Button
          color={confirmColor}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
