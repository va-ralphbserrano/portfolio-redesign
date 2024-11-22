import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/common/Input';
import { FormButton, FormStatus } from '@/components/common/Form';
import { contactData } from '../contactData';
import { fadeIn } from '@/utils/animations';
import { ContactFormData } from '../types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {submitStatus && (
        <FormStatus
          status={submitStatus}
          successMessage={contactData.form.messages.success}
          errorMessage={contactData.form.messages.error}
        />
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={contactData.form.placeholders.name}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={contactData.form.placeholders.email}
          error={errors.email}
        />
      </div>

      <Input
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        placeholder={contactData.form.placeholders.subject}
        error={errors.subject}
      />

      <Input
        type="textarea"
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder={contactData.form.placeholders.message}
        error={errors.message}
      />

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Sending..."
      >
        {contactData.form.submitButton}
      </FormButton>
    </motion.form>
  );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;
