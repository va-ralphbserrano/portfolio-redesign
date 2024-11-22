import { 
  FaCube, 
  FaCode, 
  FaGithub, 
  FaHtml5, 
  FaReact, 
  FaVideo, 
  FaMicrosoft, 
  FaSlack, 
  FaTrello, 
  FaFigma,
  FaDesktop,
  FaFileExcel,
  FaFilePowerpoint
} from 'react-icons/fa';

import { 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiCanva, 
  SiAsana, 
  SiNotion, 
  SiVisualstudiocode, 
  SiGoogle,
  SiAutodesk,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiClickup,
  SiZoom,
  SiSalesforce,
  SiZendesk,
  SiIntercom
} from 'react-icons/si';

import { BiGitBranch } from 'react-icons/bi';
import { DiJavascript } from 'react-icons/di';

export const aboutData = {
  title: 'About Me',
  tagline: 'Innovating Through Technology',
  description: 'As a forward-thinking professional with over 13 years of experience, I bridge the gap between technical expertise and business efficiency. My unique background spans technical design, virtual assistance, and web development, enabling me to deliver comprehensive solutions that drive digital transformation and operational excellence.',
  
  styles: {
    header: {
      title: 'inline-block px-6 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-600 dark:text-primary-400',
      tagline: 'text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent',
      description: 'text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed'
    },
    section: {
      wrapper: 'relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/80 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-500',
      title: 'text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent',
      subtitle: 'text-sm text-gray-600 dark:text-gray-400 mt-1'
    },
    experience: {
      card: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm',
      year: 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
      title: 'text-lg font-semibold text-gray-900 dark:text-white',
      company: 'text-primary-600 dark:text-primary-400 font-medium'
    },
    education: {
      container: 'relative space-y-12',
      timeline: 'absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400/50 to-transparent dark:from-primary-400 dark:via-primary-500/30',
      item: 'relative pl-16 group',
      dot: 'absolute left-[29px] -translate-x-1/2 top-3 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-125 transition-transform duration-300',
      iconContainer: 'absolute left-4 top-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300',
      icon: 'w-6 h-6 text-primary-600 dark:text-primary-400',
      card: 'bg-white/60 dark:bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-100/80 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1',
      year: 'inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-600 dark:text-primary-400 mb-4',
      degree: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
      school: 'text-primary-600 dark:text-primary-400 font-medium mb-3',
      description: 'text-gray-600 dark:text-gray-300 leading-relaxed'
    }
  },
  
  stats: [
    { value: "13+", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" }
  ],

  personalInfo: [
    { label: 'Birthday', value: '18 June 1987', icon: 'calendar' },
    { label: 'Age', value: `${new Date().getFullYear() - 1987}`, icon: 'calendar' },
    { label: 'GitHub', value: 'github.com/va-ralphbserrano', icon: 'globe', href: 'https://github.com/va-ralphbserrano' },
    { label: 'Email', value: 'ralph.b.serrano@gmail.com', icon: 'mail', href: 'mailto:ralph.b.serrano@gmail.com' },
    { label: 'Phone', value: '+63 995 846 2469', icon: 'phone', href: 'tel:+639958462469' },
    { 
      label: 'Location', 
      value: 'Muntinlupa City, Philippines', 
      icon: 'location',
      href: 'https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z'
    },
    { label: 'Availability', value: 'Open for Projects', icon: 'status' }
  ],

  skills: {
    'Technical Design': {
      description: 'Specialized in AutoCAD technical design with a focus on industrial and commercial equipment. Proficient in creating precise technical drawings, 3D models, and comprehensive design documentation.',
      items: [
        { name: 'AutoCAD', level: 95 },
        { name: 'Technical Drawing', level: 90 },
        { name: '3D Modeling', level: 85 },
        { name: 'Design Documentation', level: 90 }
      ]
    },
    'Web Development': {
      description: 'Experienced in modern web development technologies and frameworks, creating responsive and performant web applications with a focus on user experience.',
      items: [
        { name: 'React/Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Node.js', level: 75 }
      ]
    },
    'Project Management': {
      description: 'Skilled in coordinating complex projects, managing timelines, and ensuring efficient delivery of solutions while maintaining high quality standards.',
      items: [
        { name: 'Project Planning', level: 90 },
        { name: 'Team Coordination', level: 85 },
        { name: 'Resource Management', level: 85 },
        { name: 'Quality Assurance', level: 90 }
      ]
    }
  },

  education: [
    {
      degree: "Masterclass Virtual Assistant Course",
      school: "Surge Freelancing Marketplace",
      period: "2024",
      description: "Advanced certification in virtual assistance, focusing on project management, digital tools, and business efficiency. Achieved Gold Certificate of Completion.",
      icon: "graduation"
    },
    {
      degree: "Advance Diploma in Gaming and Animation Technology",
      school: "Informatics College Northgate",
      period: "2012 - 2013",
      description: "Specialized training in digital media production, game design principles, and animation techniques, enhancing visual and technical design capabilities.",
      icon: "graduation"
    },
    {
      degree: "Bachelor of Science in Electronics and Communications Engineering",
      school: "Mapúa Institute of Technology",
      period: "2004 - 2005",
      description: "Foundation in electronic systems, telecommunications, and circuit design, developing strong analytical and problem-solving skills.",
      icon: "graduation"
    }
  ],

  certifications: [
    {
      title: 'Virtual Assistant Masterclass',
      description: 'Comprehensive training in virtual assistance, covering project management, client communication, and productivity tools. Achieved Gold Certificate of Completion.',
      issuer: 'Surge Freelancing Marketplace',
      year: '2024'
    },
    {
      title: 'Amazon Virtual Assistant Certification',
      description: 'Specialized certification in Amazon marketplace management, product listing optimization, and customer service excellence.',
      issuer: 'Surge Freelancing Marketplace',
      year: '2024'
    },
    {
      title: 'Content Marketing Specialist',
      description: 'Advanced training in content strategy, SEO optimization, and digital marketing best practices for business growth.',
      issuer: 'Surge Freelancing Marketplace',
      year: '2024'
    },
    {
      title: 'Website Management Professional',
      description: 'Certification in website maintenance, content management systems, and technical optimization for optimal website performance.',
      issuer: 'Surge Freelancing Marketplace',
      year: '2024'
    },
    {
      title: 'Freelancing & Personal Branding',
      description: 'Comprehensive course on building a successful freelancing career and developing a strong personal brand in the digital marketplace.',
      issuer: 'Surge Freelancing Marketplace',
      year: '2024'
    }
  ],

  experience: [
    {
      title: 'Virtual Assistant',
      company: 'Freelance',
      location: 'Remote',
      period: '2020 - Present',
      type: 'Full-time',
      description: 'Delivering comprehensive virtual assistance and technical design solutions to global clients, specializing in AutoCAD design, project management, and digital transformation initiatives.',
      achievements: [
        'Streamlined project workflows resulting in 30% improved delivery times',
        'Successfully managed multiple concurrent projects while maintaining 100% client satisfaction',
        'Implemented efficient documentation systems enhancing project transparency'
      ]
    },
    {
      title: 'AutoCAD Designer & Office Administrator',
      company: 'JBY Industrial Supply and Services',
      location: 'Philippines',
      period: '2011 - 2020',
      type: 'Full-time',
      description: 'Led technical design projects and optimized office operations, specializing in industrial equipment and commercial kitchen systems design.',
      achievements: [
        'Delivered over 500 technical design projects with exceptional accuracy and client satisfaction',
        'Reduced project delivery timelines by 25% through process optimization',
        'Mentored junior designers and established design quality standards'
      ]
    },
    {
      title: 'Business Owner & Technical Manager',
      company: 'REHUB Internet Café',
      location: 'Philippines',
      period: '2007 - 2011',
      type: 'Full-time',
      description: 'Founded and managed a successful internet café business, overseeing all technical operations and customer service aspects while driving business growth.',
      achievements: [
        'Established and scaled a profitable technology-focused business',
        'Maintained 99% system uptime through proactive maintenance',
        'Developed customer loyalty programs increasing repeat business by 40%'
      ]
    }
  ],

  services: [
    {
      id: 'web-development',
      title: "Web Development",
      icon: FaCode,
      description: "Creating modern, responsive websites with cutting-edge technologies and best practices for optimal user experience.",
      features: [
        "Custom Website Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO Implementation"
      ]
    },
    {
      id: 'web-design',
      title: "Web Design",
      icon: FaDesktop,
      description: "Crafting visually appealing and user-friendly interfaces that engage visitors and drive conversions.",
      features: [
        "UI/UX Design",
        "Wireframing & Prototyping",
        "Brand Integration",
        "Design Systems"
      ]
    },
    {
      id: 'video-editing',
      title: "Video Editing",
      icon: FaVideo,
      description: "Professional video editing services using industry-standard tools to create compelling visual content.",
      features: [
        "Content Editing",
        "Color Grading",
        "Motion Graphics",
        "Audio Enhancement"
      ]
    },
    {
      id: 'autocad-design',
      title: "AutoCAD Design",
      icon: FaCube,
      description: "Expert AutoCAD services for precise technical drawings and 3D modeling solutions.",
      features: [
        "Technical Drawings",
        "3D Modeling",
        "Project Documentation",
        "Design Optimization"
      ]
    }
  ],

  tools: {
    'Design & Technical': {
      description: 'Proficient in industry-standard design and technical tools, specializing in AutoCAD for precision engineering and technical documentation.',
      items: [
        { name: 'AutoCAD', icon: 'cube', color: 'text-blue-600' },
        { name: 'Autodesk Inventor', icon: 'cube', color: 'text-orange-600' },
        { name: 'Adobe Creative Suite', icon: 'design', color: 'text-red-600' },
        { name: 'SketchUp', icon: '3d', color: 'text-green-600' }
      ]
    },
    'Development': {
      description: 'Experienced with modern development tools and frameworks for creating efficient and scalable web applications.',
      items: [
        { name: 'Visual Studio Code', icon: 'code', color: 'text-blue-500' },
        { name: 'Git & GitHub', icon: 'git', color: 'text-gray-700' },
        { name: 'Node.js', icon: 'node', color: 'text-green-600' },
        { name: 'React', icon: 'react', color: 'text-blue-400' }
      ]
    },
    'Productivity': {
      description: 'Utilize advanced project management and productivity tools to ensure efficient workflow and team collaboration.',
      items: [
        { name: 'Asana', icon: 'task', color: 'text-pink-600' },
        { name: 'Notion', icon: 'notes', color: 'text-gray-900' },
        { name: 'Slack', icon: 'chat', color: 'text-purple-500' },
        { name: 'Google Workspace', icon: 'google', color: 'text-red-500' }
      ]
    }
  }
} as const;
