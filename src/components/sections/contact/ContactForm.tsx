import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormInput } from './form/FormInput';
import { FormTextarea } from './form/FormTextarea';
import { FormState, ContactFormProps } from './types';
import { classNames } from '@/utils/helpers';

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className, isSubmitting, error }) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormState]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormState = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formState.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await onSubmit(formState);
      setSubmitStatus(response);
      
      if (response.success) {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: error || 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('space-y-6', className)}>
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={classNames(
            'p-4 rounded-lg',
            submitStatus.success
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          )}
        >
          {submitStatus.message}
        </motion.div>
      )}

      <FormInput
        label="Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
        error={formErrors.name}
        placeholder="Your name"
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        error={formErrors.email}
        placeholder="your.email@example.com"
        required
      />

      <FormInput
        label="Subject"
        name="subject"
        value={formState.subject}
        onChange={handleChange}
        error={formErrors.subject}
        placeholder="What's this about?"
        required
      />

      <FormTextarea
        label="Message"
        name="message"
        value={formState.message}
        onChange={handleChange}
        error={formErrors.message}
        placeholder="Your message"
        required
        rows={4}
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classNames(
          'w-full px-6 py-3 text-white font-medium rounded-lg transition-colors',
          isSubmitting
            ? 'bg-primary-400 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400'
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;
