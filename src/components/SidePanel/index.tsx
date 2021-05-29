import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, RefObject } from 'react';
import { classes } from '../../utils';
import CloseButton from '../Button/CloseButton';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  initialFocus?: RefObject<HTMLElement>;
  closeOnDismiss?: boolean;
}

export default function SidePanel({
  open,
  onClose,
  title,
  initialFocus,
  closeOnDismiss = true,
  children,
}: PropsWithChildren<SidePanelProps>) {
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
        <div className="min-h-screen">
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

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div className="w-full max-w-md text-gray-200 overflow-hidden text-left transition-all transform bg-gray-700 shadow-xl rounded-l-lg border-l-8 border-blue-400 border-opacity-40 fixed right-0 h-full flex flex-col">
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
                  <hr className={classes('mt-4 mb-8')} />
                </>
              )}
              <div className="p-6 pt-0 flex-1">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
