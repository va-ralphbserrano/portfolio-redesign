import { classNames } from '@/shared/utils/helpers';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  '2xl': 'max-w-6xl',
  full: 'max-w-full'
} as const;

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalHeaderProps {
  title?: string;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof modalSizes;
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div className={classNames("px-6 py-4", className)}>{children}</div>
);

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  showClose,
  onClose,
  className,
  children
}) => {
  if (!title && !showClose && !children) return null;

  return (
    <div className={classNames(
      "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700",
      className
    )}>
      {title && (
        <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </Dialog.Title>
      )}
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {children && (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  size = 'md',
  closeOnClickOutside = true,
  showCloseButton = true
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9999] overflow-y-auto"
        onClose={() => closeOnClickOutside && onClose()}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={classNames(
              'inline-block w-full text-left align-middle transition-all transform',
              'bg-white dark:bg-gray-800 rounded-2xl shadow-xl',
              'my-8 max-h-[calc(100vh-4rem)] overflow-y-auto',
              modalSizes[size],
              className
            )}>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
