import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { contactData } from '@/data/contact';
import { ContactForm } from './contact/ContactForm';
import { FormState, FormResponse } from './contact/types';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { sendEmail, EmailError } from '@/utils/email';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  mail: HiMail,
  phone: HiPhone,
  location: HiLocationMarker,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  upwork: SiUpwork
};

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormState): Promise<FormResponse> => {
    setIsSubmitting(true);
    setError(null);

    try {
      await sendEmail(formData);
      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
      };
    } catch (error) {
      if (error instanceof EmailError) {
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary>
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {contactData.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {contactData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              {contactData.info.map((item, index) => {
                const Icon = iconMap[item.icon];
                if (!Icon) return null;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                {contactData.social.map((item, index) => {
                  const Icon = iconMap[item.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

Contact.displayName = 'Contact';

export default Contact;
