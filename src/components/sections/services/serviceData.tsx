/** @jsxImportSource react */
import { HiCode, HiDesktopComputer, HiVideoCamera, HiCube, HiSupport, HiPresentationChartLine } from 'react-icons/hi';
import { Service } from './types';

const iconProps = { className: "w-8 h-8" };

const ServiceIcons = {
  Code: () => <HiCode {...iconProps} />,
  Desktop: () => <HiDesktopComputer {...iconProps} />,
  Video: () => <HiVideoCamera {...iconProps} />,
  Cube: () => <HiCube {...iconProps} />,
  Support: () => <HiSupport {...iconProps} />,
  Chart: () => <HiPresentationChartLine {...iconProps} />
};

export const services: Service[] = [
  {
    icon: <ServiceIcons.Code />,
    title: "Web Development",
    description: "Creating modern, responsive websites with cutting-edge technologies and best practices for optimal user experience.",
    features: [
      "Custom Website Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO Implementation"
    ]
  },
  {
    icon: <ServiceIcons.Desktop />,
    title: "Web Design",
    description: "Crafting visually appealing and user-friendly interfaces that engage visitors and drive conversions.",
    features: [
      "UI/UX Design",
      "Wireframing & Prototyping",
      "Brand Integration",
      "Design Systems"
    ]
  },
  {
    icon: <ServiceIcons.Video />,
    title: "Video Editing",
    description: "Professional video editing services using industry-standard tools to create compelling visual content.",
    features: [
      "Content Editing",
      "Color Grading",
      "Motion Graphics",
      "Audio Enhancement"
    ]
  },
  {
    icon: <ServiceIcons.Cube />,
    title: "AutoCAD Design",
    description: "Expert AutoCAD services for precise technical drawings and 3D modeling solutions.",
    features: [
      "Technical Drawings",
      "3D Modeling",
      "Project Documentation",
      "Design Review"
    ]
  },
  {
    icon: <ServiceIcons.Support />,
    title: "Virtual Assistance",
    description: "Comprehensive virtual support services to help businesses operate efficiently and grow.",
    features: [
      "Email Management",
      "Calendar Organization",
      "Task Coordination",
      "Document Preparation"
    ]
  },
  {
    icon: <ServiceIcons.Chart />,
    title: "Project Management",
    description: "Efficient project management services to ensure successful delivery of business initiatives.",
    features: [
      "Project Planning",
      "Team Coordination",
      "Timeline Management",
      "Progress Tracking"
    ]
  }
];
