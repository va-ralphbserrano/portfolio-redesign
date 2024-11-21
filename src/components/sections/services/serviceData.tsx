/** @jsxImportSource react */
import { serviceIcons } from '@/utils/icons/index';
import { ServicesData } from './types';

const ServiceIcons = {
  Code: serviceIcons.code(),
  Desktop: serviceIcons.desktop(),
  Video: serviceIcons.video(),
  Cube: serviceIcons.cube(),
  Support: serviceIcons.support(),
  Chart: serviceIcons.presentation()
};

export const servicesData: ServicesData = {
  title: "My Services",
  description: "Delivering comprehensive digital solutions to help businesses thrive in the modern landscape",
  services: [
    {
      id: 'web-development',
      title: "Web Development",
      icon: ServiceIcons.Code,
      description: "Creating modern, responsive websites with cutting-edge technologies and best practices for optimal user experience.",
      features: [
        "Custom Website Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO Integration"
      ]
    },
    {
      id: 'web-design',
      title: "Web Design",
      icon: ServiceIcons.Desktop,
      description: "Crafting visually appealing and user-friendly interfaces that engage visitors and drive conversions.",
      features: [
        "UI/UX Design",
        "Wireframing & Prototyping",
        "Brand Integration",
        "Mobile-First Design"
      ]
    },
    {
      id: 'video-editing',
      title: "Video Editing",
      icon: ServiceIcons.Video,
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
      icon: ServiceIcons.Cube,
      description: "Expert AutoCAD services for precise technical drawings and 3D modeling solutions.",
      features: [
        "Technical Drawings",
        "3D Modeling",
        "Project Documentation",
        "Design Analysis"
      ]
    },
    {
      id: 'virtual-assistance',
      title: "Virtual Assistance",
      icon: ServiceIcons.Support,
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
      icon: ServiceIcons.Chart,
      description: "Efficient project management services to ensure successful delivery of business initiatives.",
      features: [
        "Project Planning",
        "Team Coordination",
        "Timeline Management",
        "Resource Allocation"
      ]
    }
  ]
};
