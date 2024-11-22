import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiClock, HiPhone } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import { contactData } from './contactData';
import { ContactFormData } from './types';
import { ContactForm } from './form';
import { fadeInVariants, containerVariants } from '@/utils/animations';
import { classNames } from '@/utils/helpers';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const iconMap = {
  HiMail,
  HiLocationMarker,
  HiClock,
  HiPhone,
  FaLinkedinIn,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  SiUpwork
};

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        EMAILJS_PUBLIC_KEY
      );

      return {
        success: true,
        message: "Thank you! Your message has been sent successfully."
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: "Sorry, there was an error sending your message. Please try again."
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={classNames(
        'relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={fadeInVariants}
            className="lg:col-span-1 space-y-6"
          >
            {contactData.info.map((info, index) => {
              const Icon = iconMap[info.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={info.label}
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInVariants}
                  custom={index}
                  whileHover={{ x: 4 }}
                  className="group flex items-start p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 mr-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-2xl">
                      <Icon />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {info.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links */}
            <motion.div
              variants={fadeInVariants}
              className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-3">
                {contactData.social.map((social, index) => {
                  const Icon = iconMap[social.icon as keyof typeof iconMap];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeInVariants}
                      custom={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {social.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInVariants}
            className="lg:col-span-2 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg"
          >
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </motion.div>
        </div>

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

export default ContactSection;
