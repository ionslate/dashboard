import { useRef } from 'react';
import Modal from '.';
import Button from '../Button';

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText?: string;
  loading?: boolean;
  confirmColor?: 'red' | 'gray' | 'green' | 'pink';
}

export default function ConfirmModal({
  open,
  onConfirm,
  onCancel,
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
      onClose={onCancel}
      initialFocus={cancelButtonRef}
      description={description}
    >
      <div className="flex items-center justify-end">
        <Button
          variant="open"
          className="mr-4"
          onClick={onCancel}
          ref={cancelButtonRef}
        >
          Cancel
        </Button>
        <Button
          color={confirmColor}
          className="mr-4"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
