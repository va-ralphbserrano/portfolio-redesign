import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface ModalProps extends WithClassName {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  description?: string;
}

interface ModalOverlayProps {
  onClick: () => void;
}

interface ModalContentProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  className?: string | undefined;
}

interface ModalHeaderProps {
  title: string;
  showClose: boolean;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => (
  <Dialog.Overlay
    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    onClick={onClick}
    aria-hidden="true"
  />
);

const ModalContent: React.FC<ModalContentProps> = ({ size, children, className }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div
      className={classNames(
        'relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all w-full',
        sizeClasses[size],
        className
      )}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, showClose, onClose }) => (
  <div className="mb-4 flex items-center justify-between">
    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
      {title}
    </Dialog.Title>
    {showClose && (
      <button
        type="button"
        className="rounded-lg p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        onClick={onClose}
        aria-label="Close modal"
      >
        <HiX className="h-5 w-5" aria-hidden="true" />
      </button>
    )}
  </div>
);

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  showClose = true,
  size = 'md',
  children,
  className,
  description
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ModalOverlay onClick={onClose} />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ModalContent size={size} className={className}>
              {title && <ModalHeader title={title} showClose={showClose} onClose={onClose} />}
              {description && (
                <div id="modal-description" className="sr-only">
                  {description}
                </div>
              )}
              {children}
            </ModalContent>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.displayName = 'Modal';

export default Modal;
