import {
  CodeIcon,
  DesktopIcon,
  VideoIcon,
  CubeIcon,
  SupportIcon,
  PresentationIcon
} from '@/components/common/Icons';

export const servicesData = {
  title: 'My Services',
  description: 'Delivering comprehensive digital solutions to help businesses thrive in the modern landscape',
  services: [
    {
      id: 'web-development',
      title: "Web Development",
      icon: CodeIcon,
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
      icon: DesktopIcon,
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
      icon: VideoIcon,
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
      icon: CubeIcon,
      description: "Expert AutoCAD services for precise technical drawings and 3D modeling solutions.",
      features: [
        "Technical Drawings",
        "3D Modeling",
        "Project Documentation",
        "Design Review"
      ]
    },
    {
      id: 'virtual-assistance',
      title: "Virtual Assistance",
      icon: SupportIcon,
      description: "Comprehensive virtual support services to help businesses operate efficiently and grow.",
      features: [
        "Email Management",
        "Calendar Organization",
        "Task Coordination",
        "Document Preparation"
      ]
    },
    {
      id: 'project-management',
      title: "Project Management",
      icon: PresentationIcon,
      description: "Efficient project management services to ensure successful delivery of business initiatives.",
      features: [
        "Project Planning",
        "Team Coordination",
        "Timeline Management",
        "Progress Tracking"
      ]
    }
  ]
} as const;

export type ServicesData = typeof servicesData;
export type Service = ServicesData['services'][number];
export type ServiceFeature = Service['features'][number];
