import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineUser, HiOutlinePhone, HiOutlinePaperAirplane } from 'react-icons/hi';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.sendForm(
        'service_qntv9cs', // Replace with your EmailJS service ID
        'template_k5sm9t5', // Replace with your EmailJS template ID
        form.current,
        'rnea5EG5gzbVQrZjP' // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
      console.error('Email error:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}
        >
          {status.message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 rounded-lg shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 rounded-lg shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlinePhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 rounded-lg shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 rounded-lg shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Write your message here..."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-end"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
          <span className="relative flex items-center">
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <HiOutlinePaperAirplane className={`ml-2 transition-transform duration-300 ${
              isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
            }`} />
          </span>
        </button>
      </motion.div>
    </form>
  );
};

export default ContactForm;
