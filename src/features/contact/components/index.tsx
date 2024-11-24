import { classNames } from '@/shared/utils/helpers';
import { containerVariants, fadeInVariants } from '@/utils/animations';
import { motion } from 'framer-motion';
import React from 'react';
import * as Hi from 'react-icons/hi';
import { contactData } from './contactData';
import { ContactForm } from './form/ContactForm';
import { ContactSectionProps } from './types';

const ContactSection: React.FC<ContactSectionProps> = ({ className, onSubmit }) => {
  return (
    <motion.section
      id="contact"
      className={classNames('relative py-24 overflow-hidden', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.02]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-4 mx-auto">
        <motion.div
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInVariants}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInVariants}
              className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
            >
              Get in Touch
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 mb-4">
              {contactData.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {contactData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={fadeInVariants}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-6">
                {contactData.info.map((item, index) => {
                  const Icon = Hi[item.icon as keyof typeof Hi];
                  return (
                    <motion.a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeInVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group flex items-start space-x-4 p-6 rounded-2xl bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300
                               border border-gray-100 dark:border-gray-700/50 hover:border-primary-100 dark:hover:border-primary-900/50"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center
                                    group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors duration-300">
                          <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Links */}
              <motion.div
                variants={fadeInVariants}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-sm
                          border border-gray-100 dark:border-gray-700/50"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {contactData.social.map((item) => {
                    const Icon = Hi[item.icon as keyof typeof Hi];
                    return (
                      <motion.a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center
                                 hover:bg-primary-50 dark:hover:bg-primary-900/20
                                 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                                 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                        <span className="sr-only">{item.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInVariants}
              className="relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg
                         border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] rounded-2xl" />
              <div className="relative">
                <ContactForm onSubmit={onSubmit} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
