/** @jsxImportSource react */
import { ContactData } from './types';

export const contactData: ContactData = {
  title: 'Get in Touch',
  description: 'Have a project in mind or want to discuss opportunities? Feel free to reach out!',
  info: [
    {
      label: 'Email',
      value: 'contact@example.com',
      icon: 'HiMail'
    },
    {
      label: 'Phone',
      value: '+1 (555) 123-4567',
      icon: 'HiPhone'
    },
    {
      label: 'Location',
      value: 'San Francisco, CA',
      icon: 'HiLocationMarker'
    }
  ],
  social: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      icon: 'HiMail'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/username',
      icon: 'HiMail'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: 'HiMail'
    }
  ],
  form: {
    submitEndpoint: '/api/contact',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
        required: true
      },
      email: {
        label: 'Email',
        placeholder: 'your.email@example.com',
        required: true
      },
      subject: {
        label: 'Subject',
        placeholder: "What's this about?",
        required: true
      },
      message: {
        label: 'Message',
        placeholder: 'Your message',
        required: true
      }
    }
  }
};
