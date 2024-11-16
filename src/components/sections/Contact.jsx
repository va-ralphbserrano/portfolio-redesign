import React from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import ContactForm from './contact/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: <HiMail className="w-6 h-6" />,
      title: 'Email',
      value: 'ralph.b.serrano@gmail.com',
      href: 'mailto:ralph.b.serrano@gmail.com'
    },
    {
      icon: <HiPhone className="w-6 h-6" />,
      title: 'Phone',
      value: '+63 995 846 2469',
      href: 'tel:+639958462469'
    },
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      title: 'Location',
      value: 'Muntinlupa City, Philippines',
      href: 'https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/ralphbserrano/',
      label: 'LinkedIn'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: 'https://github.com/va-ralphbserrano',
      label: 'GitHub'
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      href: 'https://www.youtube.com/@RalphBernardSerrano',
      label: 'YouTube'
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      href: 'https://www.facebook.com/va.ralphbserrano/',
      label: 'Facebook'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/half21dead/',
      label: 'Instagram'
    },
    {
      icon: <SiUpwork className="w-5 h-5" />,
      href: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1',
      label: 'Upwork'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's collaborate to create something amazing. Feel free to reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-lg space-y-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.title === 'Location' ? '_blank' : undefined}
                  rel={item.title === 'Location' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <div className="text-primary-500 dark:text-primary-400">{item.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Connect with me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-300"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
