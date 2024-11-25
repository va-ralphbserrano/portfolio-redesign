/** @jsxImportSource react */
import { serviceIcons } from '@/shared/utils/icons/serviceIcons';
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
  title: "Expert Services",
  description: "Delivering precision-engineered solutions and comprehensive digital services that drive innovation, efficiency, and business growth",
  services: [
    {
      id: 'technical-design',
      title: "Technical Design & CAD",
      icon: ServiceIcons.Cube,
      description: "Delivering precision-engineered technical drawings and 3D models using advanced CAD technologies. Specializing in industrial equipment, commercial systems, and detailed documentation.",
      features: [
        "AutoCAD technical drawings and documentation",
        "Industrial and commercial system design",
        "3D modeling and visualization",
        "Technical specifications compliance",
        "Design optimization and revision control"
      ]
    },
    {
      id: 'virtual-assistance',
      title: "Virtual Assistance",
      icon: ServiceIcons.Support,
      description: "Comprehensive virtual support services focused on enhancing operational efficiency and digital transformation. Expertise in project coordination, documentation, and process optimization.",
      features: [
        "Project management and coordination",
        "Technical documentation and reporting",
        "Process automation and optimization",
        "Digital workflow implementation",
        "Administrative systems management"
      ]
    },
    {
      id: 'web-development',
      title: "Web Development",
      icon: ServiceIcons.Code,
      description: "Creating modern, responsive web applications using cutting-edge technologies. Focus on performance optimization, user experience, and scalable solutions that drive business growth.",
      features: [
        "React/Next.js application development",
        "TypeScript and modern JavaScript solutions",
        "Responsive design with Tailwind CSS",
        "Performance optimization and SEO",
        "API integration and documentation"
      ]
    },
    {
      id: 'multimedia',
      title: "Multimedia Production",
      icon: ServiceIcons.Video,
      description: "Professional multimedia content creation utilizing industry-standard tools for compelling visual storytelling. Expertise in video production, motion graphics, and content optimization.",
      features: [
        "Professional video post-production",
        "Motion graphics and animations",
        "Visual content creation and editing",
        "Audio enhancement and synchronization",
        "Multi-platform content optimization"
      ]
    },
    {
      id: 'technical-support',
      title: "Technical Support",
      icon: ServiceIcons.Desktop,
      description: "Expert technical assistance and problem-solving services for businesses and individuals. Specializing in system optimization, troubleshooting, and technology implementation.",
      features: [
        "System analysis and optimization",
        "Technical troubleshooting",
        "Software implementation and training",
        "IT infrastructure management",
        "Technical documentation and guides"
      ]
    },
    {
      id: 'project-management',
      title: "Project Management",
      icon: ServiceIcons.Chart,
      description: "Strategic project leadership focusing on efficient delivery, risk management, and quality assurance. Utilizing modern methodologies to ensure project success and stakeholder satisfaction.",
      features: [
        "Project planning and execution",
        "Resource allocation and optimization",
        "Risk assessment and mitigation",
        "Quality control and assurance",
        "Stakeholder communication"
      ]
    }
  ],
  faqs: [
    {
      question: "What types of technical design services do you offer?",
      answer: "I offer comprehensive technical design services using AutoCAD, specializing in industrial equipment, commercial systems, and detailed documentation. This includes technical drawings, 3D modeling, system design, and specification compliance."
    },
    {
      question: "Can you help with virtual assistance and project management?",
      answer: "Yes, I provide comprehensive virtual assistance services including project coordination, technical documentation, process automation, digital workflow implementation, and administrative systems management. I also offer strategic project management services focusing on efficient delivery and stakeholder satisfaction."
    },
    {
      question: "What web development technologies do you work with?",
      answer: "I specialize in modern web development using React/Next.js, TypeScript, and Tailwind CSS. I focus on creating responsive, performant applications with optimized SEO and seamless API integrations."
    },
    {
      question: "Do you offer multimedia production services?",
      answer: "Yes, I provide professional multimedia production services including video post-production, motion graphics, visual content creation, audio enhancement, and content optimization for multiple platforms."
    },
    {
      question: "What kind of technical support do you provide?",
      answer: "I offer expert technical support services including system analysis and optimization, troubleshooting, software implementation and training, IT infrastructure management, and technical documentation."
    },
    {
      question: "How do you ensure project quality and timely delivery?",
      answer: "I employ modern project management methodologies with a focus on quality control, risk assessment, resource optimization, and clear stakeholder communication to ensure successful project delivery."
    }
  ]
};
