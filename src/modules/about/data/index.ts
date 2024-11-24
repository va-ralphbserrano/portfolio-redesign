import {
  FaBriefcase,
  FaCertificate,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaFacebook,
  FaGlobe,
  FaGraduationCap,
  FaInstagram,
  FaLanguage,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaUserCog,
  FaVideo,
  FaClock,
  FaYoutube,
  FaSkype
} from 'react-icons/fa';
import {
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAutodesk,
  SiCanva,
  SiFigma,
  SiGit,
  SiJira,
  SiLinkedin,
  SiMicrosoftoffice,
  SiNextdotjs,
  SiNotion,
  SiReact,
  SiSlack,
  SiTailwindcss,
  SiTypescript,
  SiUpwork,
  SiVisualstudiocode,
  SiGithub
} from 'react-icons/si';
import { HiBriefcase, HiGlobeAlt } from 'react-icons/hi';

// About Section Data
export const aboutData = {
  tagline: "Crafting Digital Excellence",
  description: "A seasoned professional with over a decade of experience in technical design, project management, and digital solutions. Combining precision engineering with innovative web development to deliver comprehensive solutions."
};

// Personal Information - Focused on professional aspects
export const personalInfo = [
  {
    label: 'Experience',
    value: '13+ Years',
    icon: FaBriefcase
  },
  {
    label: 'Location',
    value: 'Muntinlupa City, Philippines',
    icon: FaMapMarkerAlt
  },
  {
    label: 'Timezone',
    value: 'GMT+8 (Philippine Time)',
    icon: FaClock
  },
  {
    label: 'Languages',
    value: 'English, Filipino',
    icon: FaLanguage
  },
  {
    label: 'Availability',
    value: 'Full-time, Contract',
    icon: FaUser
  }
];

// Professional Profiles
export const professionalProfiles = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ralphbserrano',
    icon: SiLinkedin,
    url: 'https://www.linkedin.com/in/ralphbserrano/'
  },
  {
    label: 'GitHub',
    value: 'github.com/va-ralphbserrano',
    icon: SiGithub,
    url: 'https://github.com/va-ralphbserrano'
  },
  {
    label: 'Upwork',
    value: 'upwork.com/freelancers/~01fc7b069d50ef3e6c',
    icon: SiUpwork,
    url: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1'
  },
  {
    label: 'OnlineJobs.ph',
    value: 'onlinejobs.ph/jobseekers/info/3437708',
    icon: HiGlobeAlt,
    url: 'https://www.onlinejobs.ph/jobseekers/info/3437708'
  },
  {
    label: 'Skype',
    value: 'live:.cid.3897ce00d306209e',
    icon: FaSkype,
    url: 'skype:live:.cid.3897ce00d306209e?chat'
  },
  {
    label: 'Facebook',
    value: 'facebook.com/va.ralphbserrano',
    icon: FaFacebook,
    url: 'https://www.facebook.com/va.ralphbserrano/'
  },
  {
    label: 'Instagram',
    value: 'instagram.com/half21dead',
    icon: FaInstagram,
    url: 'https://www.instagram.com/half21dead/'
  },
  {
    label: 'YouTube',
    value: 'youtube.com/@RalphBernardSerrano',
    icon: FaYoutube,
    url: 'https://www.youtube.com/@RalphBernardSerrano'
  },
  {
    label: 'Email',
    value: 'ralph.b.serrano@gmail.com',
    icon: FaEnvelope,
    url: 'mailto:ralph.b.serrano@gmail.com'
  }
];

// Skills Data - Grouped by service categories
export const skills = [
  {
    category: "Technical Design",
    skills: [
      {
        name: 'AutoCAD Design',
        percentage: 95,
        color: '#2563eb'
      },
      {
        name: '3D Modeling',
        percentage: 90,
        color: '#2563eb'
      }
    ]
  },
  {
    category: "Project Management",
    skills: [
      {
        name: 'Project Coordination',
        percentage: 92,
        color: '#7c3aed'
      },
      {
        name: 'Process Optimization',
        percentage: 88,
        color: '#7c3aed'
      }
    ]
  },
  {
    category: "Development",
    skills: [
      {
        name: 'React/Next.js',
        percentage: 85,
        color: '#059669'
      },
      {
        name: 'TypeScript',
        percentage: 82,
        color: '#059669'
      }
    ]
  },
  {
    category: "Multimedia",
    skills: [
      {
        name: 'Video Production',
        percentage: 88,
        color: '#dc2626'
      },
      {
        name: 'Visual Design',
        percentage: 85,
        color: '#dc2626'
      }
    ]
  }
];

// Education - Highlighting relevant qualifications
export const education = [
  {
    degree: "Masterclass Virtual Assistant Course",
    institution: "Surge Freelancing Marketplace",
    year: "2024",
    description: "Comprehensive training in virtual assistance, project management, and digital productivity.",
    achievements: [
      "Top performer in project management module",
      "Specialized in digital workflow optimization",
      "Certified in advanced productivity tools"
    ],
    certificationUrl: "https://surge.com/cert/123",
    icon: FaGraduationCap,
    type: "Certification"
  },
  {
    degree: "Advance Diploma in Gaming and Animation Technology",
    institution: "Informatics College Northgate",
    year: "2012-2013",
    description: "Advanced studies in multimedia production, 3D modeling, and digital content creation.",
    achievements: [
      "Specialized in 3D modeling and animation",
      "Led team projects in multimedia production",
      "Created award-winning animation projects"
    ],
    icon: FaGraduationCap,
    type: "Diploma"
  },
  {
    degree: "Bachelor of Science in Electronics and Communications Engineering",
    institution: "Mapúa Institute of Technology",
    year: "2004-2005",
    description: "Foundation in engineering principles, technical design, and system analysis.",
    achievements: [
      "Advanced coursework in technical design",
      "Specialized in communications systems",
      "Hands-on experience with CAD tools"
    ],
    icon: FaGraduationCap,
    type: "Degree"
  }
];

// Experience Data with Metrics and Achievements
export const experience = [
  {
    title: "Executive Assistant Apprenticeship Program",
    company: "Surge Freelancing Marketplace",
    year: "2024",
    description: "Intensive training program focusing on virtual assistance and project management excellence.",
    achievements: [
      {
        metric: "100%",
        description: "Course completion rate with distinction"
      },
      {
        metric: "15+",
        description: "Projects completed during training"
      },
      {
        metric: "5",
        description: "New productivity tools mastered"
      }
    ],
    skills: ["Project Management", "Digital Workflow", "Communication"],
    icon: HiBriefcase
  },
  {
    title: "AutoCAD Designer & Office Administrator",
    company: "JBY Industrial Supply and Services",
    year: "2011 - 2020",
    description: "Led technical design projects and optimized office operations.",
    achievements: [
      {
        metric: "25%",
        description: "Increase in operational efficiency"
      },
      {
        metric: "200+",
        description: "Technical drawings completed"
      },
      {
        metric: "98%",
        description: "Client satisfaction rate"
      }
    ],
    skills: ["AutoCAD", "Project Management", "Office Administration"],
    icon: HiBriefcase
  },
  {
    title: "Owner & Manager",
    company: "REHUB Internet Café",
    year: "2007 - 2011",
    description: "Managed all aspects of business operations and technical maintenance.",
    achievements: [
      {
        metric: "95%",
        description: "Customer satisfaction rate"
      },
      {
        metric: "30%",
        description: "Revenue growth year-over-year"
      },
      {
        metric: "1000+",
        description: "Regular customers served"
      }
    ],
    skills: ["Business Management", "Technical Support", "Customer Service"],
    icon: HiBriefcase
  }
];

// Professional Tools - Categorized by function
export const tools = [
  {
    category: "Design & Media",
    items: [
      {
        name: 'AutoCAD',
        icon: SiAutodesk,
        color: '#E51E25'
      },
      {
        name: 'Adobe Photoshop',
        icon: SiAdobephotoshop,
        color: '#31A8FF'
      },
      {
        name: 'Adobe Premiere Pro',
        icon: SiAdobepremierepro,
        color: '#9999FF'
      },
      {
        name: 'Figma',
        icon: SiFigma,
        color: '#F24E1E'
      },
      {
        name: 'Canva',
        icon: SiCanva,
        color: '#00C4CC'
      }
    ]
  },
  {
    category: "Development",
    items: [
      {
        name: 'React',
        icon: SiReact,
        color: '#61DAFB'
      },
      {
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178C6'
      },
      {
        name: 'Next.js',
        icon: SiNextdotjs,
        color: '#000000'
      },
      {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        color: '#06B6D4'
      },
      {
        name: 'Git',
        icon: SiGit,
        color: '#F05032'
      }
    ]
  },
  {
    category: "Productivity",
    items: [
      {
        name: 'VS Code',
        icon: SiVisualstudiocode,
        color: '#007ACC'
      },
      {
        name: 'Notion',
        icon: SiNotion,
        color: '#000000'
      },
      {
        name: 'Jira',
        icon: SiJira,
        color: '#0052CC'
      },
      {
        name: 'Slack',
        icon: SiSlack,
        color: '#4A154B'
      },
      {
        name: 'Microsoft Office',
        icon: SiMicrosoftoffice,
        color: '#D83B01'
      }
    ]
  }
];
