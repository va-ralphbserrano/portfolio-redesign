import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface FormStatusProps extends WithClassName {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  message,
  className
}) => {
  if (status === 'idle' || !message) return null;

  const statusClasses = {
    loading: 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200',
    success: 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-200',
    error: 'bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-200'
  };

  return (
    <div
      className={classNames(
        'p-4 rounded-lg',
        statusClasses[status],
        className
      )}
      role="alert"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

FormStatus.displayName = 'FormStatus';

export default FormStatus;
