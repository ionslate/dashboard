import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { classes } from '../../utils';
import Button from '../Button';
import { toast, ToastData, ToastType } from './ToastService';

const toastColorMap: Record<ToastType, string> = {
  info: 'bg-blue-700',
  success: 'bg-green-700',
  warn: 'bg-yellow-600',
  error: 'bg-red-700',
};

function Toast({ id, message, type }: ToastData) {
  const [status, setStatus] = useState<'mount' | 'idle' | 'unmount'>('mount');

  useEffect(() => {
    setStatus('idle');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('unmount');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  return (
    <div
      className={classes(
        toastColorMap[type],
        'flex justify-between items-center w-[21rem] min-h-[4rem] pointer-events-auto mb-2 py-2 px-3 pr-1 rounded text-white transition transform ease-in-out',
        status === 'mount' && 'opacity-0 scale-95 -translate-y-10',
        status === 'idle' && 'opacity-100 scale-100 translate-y-0',
        status === 'unmount' && 'opacity-0 scale-95 -translate-y-10',
      )}
      onTransitionEnd={() => {
        if (status === 'unmount') {
          toast.removeToast(id);
        }
      }}
    >
      <span>{message}</span>
      <div className="flex items-center">
        <Button
          icon={FiX}
          variant="open"
          className="ml-2"
          onClick={() => setStatus('unmount')}
        />
      </div>
    </div>
  );
}

export default function Toaster() {
  const [toasts, setToasts] = useState(toast.activeToasts.value);

  useEffect(() => {
    const unsubscribe = toast.activeToasts.subscribe(setToasts);

    return unsubscribe;
  }, []);

  return (
    <div className="fixed bg-transparent top-0 left-0 right-0 pointer-events-none flex flex-col items-center justify-center p-1">
      {toasts.map(({ id, message, type }) => (
        <Toast key={id} id={id} message={message} type={type} />
      ))}
    </div>
  );
}
