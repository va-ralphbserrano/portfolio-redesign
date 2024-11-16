// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' }
];

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/va-ralphbserrano',
    icon: 'FaGithub'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ralphbserrano/',
    icon: 'FaLinkedin'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@RalphBernardSerrano',
    icon: 'FaYoutube'
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
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1',
    icon: 'FaUpwork'
  }
];

// Portfolio Categories
export const PORTFOLIO_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'web', name: 'Web Development' },
  { id: 'design', name: 'Design' },
  { id: 'video', name: 'Video Editing' },
  { id: 'autocad', name: 'AutoCAD' }
];

// Services
export const SERVICES = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Creating modern and responsive websites using latest technologies',
    icon: 'FaCode',
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'CMS Integration',
      'API Development'
    ]
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Designing beautiful and intuitive user interfaces',
    icon: 'FaPaintBrush',
    features: [
      'User Interface Design',
      'User Experience Design',
      'Prototyping',
      'Design Systems'
    ]
  },
  {
    id: 3,
    title: 'Video Editing',
    description: 'Professional video editing and post-production',
    icon: 'FaVideo',
    features: [
      'Video Editing',
      'Motion Graphics',
      'Color Grading',
      'Audio Mixing'
    ]
  },
  {
    id: 4,
    title: 'AutoCAD Design',
    description: '2D and 3D design using AutoCAD',
    icon: 'FaDraftingCompass',
    features: [
      '2D Drafting',
      '3D Modeling',
      'Technical Drawings',
      'Construction Documents'
    ]
  }
];

// Skills
export const SKILLS = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 90 },
      { name: 'Vue.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Tailwind CSS', level: 95 }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PHP', level: 75 },
      { name: 'MongoDB', level: 85 }
    ]
  },
  {
    category: 'Design',
    items: [
      { name: 'Figma', level: 90 },
      { name: 'Adobe XD', level: 85 },
      { name: 'Photoshop', level: 80 },
      { name: 'Illustrator', level: 75 }
    ]
  }
];

// Contact Form Fields
export const CONTACT_FIELDS = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Enter message subject',
    required: true
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter your message',
    required: true
  }
];

// Theme Colors
export const THEME_COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#2ecc71',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
};
