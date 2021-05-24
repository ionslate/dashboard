import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, RefObject } from 'react';
import { classes } from '../../utils';
import CloseButton from '../Button/CloseButton';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  initialFocus?: RefObject<HTMLElement>;
  description?: string;
  closeOnDismiss?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  initialFocus,
  description,
  closeOnDismiss = true,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        open={open}
        onClose={closeOnDismiss ? onClose : () => null}
        initialFocus={initialFocus}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-4"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded  border-l-4 border-indigo-400 border-opacity-40">
              {title && (
                <>
                  <div className="flex items-center justify-between p-6 pb-0">
                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-bold leading-6 text-gray-100 tracking-wide"
                    >
                      {title}
                    </Dialog.Title>
                    <CloseButton onClick={onClose} />
                  </div>
                  <hr
                    className={classes('mt-4', description ? 'mb-4' : 'mb-8')}
                  />
                </>
              )}
              <div className="p-6 pt-0">
                {description && (
                  <p className="mb-4 text-gray-200">{description}</p>
                )}
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
