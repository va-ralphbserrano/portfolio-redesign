// Import portfolio images
import portfolio1 from '@/assets/images/portfolio/portfolio-1.png';
import portfolio2 from '@/assets/images/portfolio/portfolio-2.png';
import portfolio3 from '@/assets/images/portfolio/portfolio-3.png';
import portfolio4 from '@/assets/images/portfolio/portfolio-4.png';
import portfolio5 from '@/assets/images/portfolio/portfolio-5.png';
import portfolio6 from '@/assets/images/portfolio/portfolio-6.png';
import portfolio7 from '@/assets/images/portfolio/portfolio-7.png';
import portfolio8 from '@/assets/images/portfolio/portfolio-8.png';
import portfolio9 from '@/assets/images/portfolio/portfolio-9.png';
import portfolio10 from '@/assets/images/portfolio/portfolio-10.png';
import diceRollerImg from '@/assets/images/projects/diceroller.png';

// Import certificate images
import cert1 from '@/assets/images/certificate/apprenticeship-certificate.png';
import cert2 from '@/assets/images/certificate/masterclass-certificate.png';
import cert3 from '@/assets/images/certificate/freelancing-brand.png';
import cert4 from '@/assets/images/certificate/website-management.png';
import cert5 from '@/assets/images/certificate/amazon-va.png';
import cert6 from '@/assets/images/certificate/content-marketing.png';

export const projects = [
  {
    id: 1,
    title: 'AutoCAD Design',
    category: 'autocad',
    image: portfolio1,
    description: 'Mechanical Design and Drawing',
    technologies: ['AutoCAD', 'Mechanical Drawing', 'Design'],
    demoLink: 'https://drive.google.com/drive/folders/1YFXO-XOFCdXZHZ5SXBkQqwQDaZ_RPtYH?usp=sharing',
    type: 'Design'
  },
  {
    id: 2,
    title: 'Video Editing',
    category: 'video',
    image: portfolio2,
    description: 'Professional Video Editing',
    technologies: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Video Editing'],
    demoLink: 'https://drive.google.com/drive/folders/1Ue6rSxuLFgVVZ4uBq1Z_FgF8zB9VQBG1?usp=sharing',
    type: 'Video'
  },
  {
    id: 3,
    title: 'Email Management',
    category: 'management',
    image: portfolio3,
    description: 'Professional Email Management',
    technologies: ['Email', 'Communication', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1JoEhK9qMKWN6E0hZcGBQf9hy_4BLc0Aq?usp=sharing',
    type: 'Management'
  },
  {
    id: 4,
    title: 'Data Entry',
    category: 'management',
    image: portfolio4,
    description: 'Professional Data Entry',
    technologies: ['Excel', 'Google Sheets', 'Data Management'],
    demoLink: 'https://drive.google.com/drive/folders/1RFxUz5H-Tk4RHxm-BgylU-I3H4FRBy_B?usp=sharing',
    type: 'Management'
  },
  {
    id: 5,
    title: 'Project Management',
    category: 'management',
    image: portfolio5,
    description: 'Project Management with Trello',
    technologies: ['Trello', 'Project Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1Fh69DgwzEqQnxiKRVe1tcVdGDdqC3Ue0?usp=sharing',
    type: 'Management'
  },
  {
    id: 6,
    title: 'Calendar Management',
    category: 'management',
    image: portfolio6,
    description: 'Travel/Calendar Management and Appointment Setting',
    technologies: ['Calendar', 'Scheduling', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1XEGWaVMGvh1O-NnxmJydV0KIOsChHlLm?usp=sharing',
    type: 'Management'
  },
  {
    id: 7,
    title: 'Content Creation',
    category: 'design',
    image: portfolio7,
    description: 'Professional Content Creation',
    technologies: ['Content Writing', 'Design', 'Social Media'],
    demoLink: 'https://drive.google.com/drive/folders/19x3cIw20fqqhX73ZV83eEMueysmgswBK?usp=sharing',
    type: 'Design'
  },
  {
    id: 8,
    title: 'Apprenticeship',
    category: 'education',
    image: portfolio8,
    description: 'Executive Assistant Apprenticeship Program',
    technologies: ['Virtual Assistance', 'Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1vr3zsSHroynxjWyIkpqRSlt1raSJSFg-?usp=sharing',
    type: 'Education'
  },
  {
    id: 9,
    title: 'MVA Course',
    category: 'education',
    image: portfolio9,
    description: 'MVA Class Course Completion',
    technologies: ['Virtual Assistance', 'Management', 'Skills'],
    demoLink: 'https://drive.google.com/drive/folders/10vyiRW-F4qs1tsydPxiHhHpWJbEHxfDH?usp=sharing',
    type: 'Education'
  },
  {
    id: 10,
    title: 'Dice Roller',
    category: 'demo',
    image: diceRollerImg,
    description: 'Random Dice Roller Web Application',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    demoLink: 'https://va-ralphbserrano.github.io/randomDice/',
    codeLink: 'https://github.com/va-ralphbserrano/randomDice',
    type: 'Web App'
  },
  {
    id: 11,
    title: 'Old Portfolio',
    category: 'web',
    image: portfolio10,
    description: 'My Previous Portfolio Website',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    demoLink: 'https://va-ralphbserrano.github.io/myportfolio/',
    codeLink: 'https://github.com/va-ralphbserrano/myportfolio',
    type: 'Web App'
  }
];

export const certificates = [
  {
    id: 1,
    title: 'Executive Assistant Apprenticeship',
    image: cert1,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'certification'
  },
  {
    id: 2,
    title: 'Masterclass in Virtual Assistant',
    image: cert2,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'certification'
  },
  {
    id: 3,
    title: 'Best in Setting a Freelancing Brand',
    image: cert3,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'achievement'
  },
  {
    id: 4,
    title: 'Best in Website Management',
    image: cert4,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'achievement'
  },
  {
    id: 5,
    title: 'Amazon Virtual Assistant Tasks',
    image: cert5,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'certification'
  },
  {
    id: 6,
    title: 'Content Marketing Strategy',
    image: cert6,
    description: 'Surge Freelancing Marketplace, 2024',
    category: 'certification'
  }
];
