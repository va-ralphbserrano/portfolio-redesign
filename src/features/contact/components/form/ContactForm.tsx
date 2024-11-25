import { FormButton, FormStatus } from '@/components/common/forms';
import { Input } from '@/components/common/forms';
import { Textarea } from '@/components/common/forms/Textarea';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { contactData } from '../contactData';
import { fadeInVariants } from '@/shared/animations';
import { ContactFormData } from '../types';
import { EmailError, EmailErrorType } from '@/shared/utils/email';
import { WithClassName } from '@/types/component';
import { classNames } from '@/shared/utils/helpers';

export interface ContactFormProps extends WithClassName {
  isSubmitting?: boolean;
  onSubmit?: (formData: ContactFormData) => Promise<{ success: boolean; message: string }>;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  className, 
  isSubmitting: externalIsSubmitting,
  onSubmit 
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    // emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (submitStatus) {
      const timeout = setTimeout(() => {
        setSubmitStatus(null);
      }, submitStatus === 'success' ? 5000 : 8000);
      
      return () => clearTimeout(timeout);
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: string): boolean => {
    switch (name) {
      case 'name':
        return value.length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'message':
        return value.length >= 10;
      default:
        return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting || externalIsSubmitting) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSuccess(true);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      setIsError(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={classNames(
        'flex flex-col space-y-6',
        className
      )}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {submitStatus && (
        <FormStatus
          status={submitStatus}
          successMessage="Thank you! Your message has been sent successfully."
          errorMessage="Sorry, we couldn't send your message. Please check the errors below and try again."
        />
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          name="name"
          type="text"
          label="Full Name"
          placeholder={contactData.form.placeholders.name}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          name="email"
          type="email"
          label="Email Address"
          placeholder={contactData.form.placeholders.email}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <Input
        type="text"
        name="subject"
        label="Subject"
        placeholder="What's this about?"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        required
      />

      <Textarea
        name="message"
        label="Message"
        placeholder="How can we help you?"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
        rows={6}
      />

      <div>
        <FormButton
          type="submit"
          disabled={isLoading || externalIsSubmitting}
          className="w-full sm:w-auto"
        >
          {(isLoading || externalIsSubmitting) ? 'Sending...' : contactData.form.submitButton}
        </FormButton>
      </div>
    </motion.form>
  );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;