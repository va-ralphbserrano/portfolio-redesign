export const metaConfig = {
  title: 'Ralph Bernard Serrano - Technical Designer & Virtual Solutions Expert',
  description: 'Technical Designer & Virtual Solutions Expert with 13+ years of experience in AutoCAD Technical Design, Modern Web Development, and Virtual Assistance. Transform your ideas into reality.',
  author: 'Ralph Bernard Serrano',
  siteUrl: 'https://va-ralphbserrano.github.io',
  themeColor: '#2ecc71',
  socialMedia: {
    github: 'https://github.com/va-ralphbserrano',
    linkedin: 'https://www.linkedin.com/in/ralphbserrano/',
    youtube: 'https://www.youtube.com/@RalphBernardSerrano',
    facebook: 'https://www.facebook.com/va.ralphbserrano/',
    instagram: 'https://www.instagram.com/half21dead/',
    upwork: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1'
  },
  contact: {
    email: 'ralph.b.serrano@gmail.com',
    phone: '+63 995 846 2469',
    location: 'Muntinlupa City, Philippines'
  },
  openGraph: {
    type: 'website',
    image: '/assets/images/og-image.jpg',
    imageAlt: 'Ralph Bernard Serrano - Technical Designer & Virtual Solutions Expert',
    imageWidth: '1200',
    imageHeight: '630'
  },
  twitter: {
    card: 'summary_large_image',
    image: '/assets/images/twitter-image.jpg',
    site: '@RalphBSerrano',
    creator: '@RalphBSerrano'
  },
  keywords: [
    'Technical Designer',
    'Virtual Solutions Expert',
    'AutoCAD Technical Design',
    'Web Development',
    'Virtual Assistance',
    'Project Management',
    'React Developer',
    'TypeScript',
    'Node.js',
    'Full Stack Developer',
    'Freelancer',
    'Philippines'
  ],
  alternateLocales: ['en_US', 'en_PH'],
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_ID', // Add your Google verification ID
    bing: 'YOUR_BING_VERIFICATION_ID', // Add your Bing verification ID
  }
} as const;

export type MetaConfig = typeof metaConfig;
