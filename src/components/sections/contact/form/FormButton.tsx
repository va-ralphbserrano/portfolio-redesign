import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface FormButtonProps extends WithClassName {
  isSubmitting?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  isSubmitting,
  className
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={classNames(
        'px-6 py-2 text-white bg-primary-500 rounded-lg',
        'hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        className
      )}
    >
      {isSubmitting ? (
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Sending...</span>
        </div>
      ) : (
        'Send Message'
      )}
    </button>
  );
};

FormButton.displayName = 'FormButton';

export default FormButton;
