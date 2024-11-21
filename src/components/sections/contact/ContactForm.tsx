import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormField, FormStatus } from './form';
import { FormState, ContactFormProps } from './types';
import { classNames } from '@/utils/helpers';
import { Button } from '@/components/common/Button/Button';

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

  const getFormStatus = () => {
    if (isSubmitting) return 'loading';
    if (submitStatus?.success) return 'success';
    if (submitStatus?.message && !submitStatus.success) return 'error';
    return 'idle';
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={classNames('space-y-6', className)}
      onSubmit={handleSubmit}
    >
      <FormStatus 
        status={getFormStatus()} 
        message={submitStatus?.message}
      />

      <FormField
        type="text"
        name="name"
        label="Name"
        value={formState.name}
        onChange={handleChange}
        error={formErrors.name}
        placeholder="Your name"
        required
      />

      <FormField
        type="email"
        name="email"
        label="Email"
        value={formState.email}
        onChange={handleChange}
        error={formErrors.email}
        placeholder="your.email@example.com"
        required
      />

      <FormField
        type="text"
        name="subject"
        label="Subject"
        value={formState.subject}
        onChange={handleChange}
        error={formErrors.subject}
        placeholder="What's this about?"
        required
      />

      <FormField
        type="textarea"
        name="message"
        label="Message"
        value={formState.message}
        onChange={handleChange}
        error={formErrors.message}
        placeholder="Your message"
        required
        rows={4}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;
