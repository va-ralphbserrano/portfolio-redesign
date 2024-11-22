import { ContactData } from './types';

export const contactData: ContactData = {
  title: "Let's Work Together",
  description: "Ready to elevate your business with professional virtual assistance? I'm here to help streamline your operations and boost your productivity.",
  info: [
    {
      label: 'Email',
      value: 'ralph.b.serrano@gmail.com',
      icon: 'HiMail',
      url: 'mailto:ralph.b.serrano@gmail.com'
    },
    {
      label: 'Phone',
      value: '+63 995 846 2469',
      icon: 'HiPhone',
      url: 'tel:+639958462469'
    },
    {
      label: 'Location',
      value: 'Muntinlupa City, Philippines',
      icon: 'HiLocationMarker',
      url: 'https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z'
    },
    {
      label: 'Availability',
      value: 'Open for Projects',
      icon: 'HiClock',
      url: '#'
    }
  ],
  social: [
    {
      name: 'GitHub',
      url: 'https://github.com/va-ralphbserrano',
      icon: 'FaGithub'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ralphbserrano/',
      icon: 'FaLinkedinIn'
    },
    {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1',
      icon: 'SiUpwork'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/va.ralphbserrano/',
      icon: 'FaFacebook'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/half21dead/',
      icon: 'FaInstagram'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@RalphBernardSerrano',
      icon: 'FaYoutube'
    }
  ],
  form: {
    submitButton: 'Send Message',
    placeholders: {
      name: 'Enter your full name',
      email: 'Enter your email address',
      subject: 'What is this regarding?',
      message: 'How can I help you?'
    },
    messages: {
      success: 'Message sent successfully! I will respond to your inquiry within 24-48 hours.',
      error: 'Please fill in all required fields correctly before submitting the form.'
    }
  }
};
