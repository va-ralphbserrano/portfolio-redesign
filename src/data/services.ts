export const servicesData = {
  title: 'My Services',
  description: 'Delivering comprehensive digital solutions to help businesses thrive in the modern landscape',
  services: [
    {
      title: "Web Development",
      icon: "code",
      description: "Creating modern, responsive websites with cutting-edge technologies and best practices for optimal user experience.",
      features: [
        "Custom Website Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO Implementation"
      ]
    },
    {
      title: "Web Design",
      icon: "desktop",
      description: "Crafting visually appealing and user-friendly interfaces that engage visitors and drive conversions.",
      features: [
        "UI/UX Design",
        "Wireframing & Prototyping",
        "Brand Integration",
        "Design Systems"
      ]
    },
    {
      title: "Video Editing",
      icon: "video",
      description: "Professional video editing services using industry-standard tools to create compelling visual content.",
      features: [
        "Content Editing",
        "Color Grading",
        "Motion Graphics",
        "Audio Enhancement"
      ]
    },
    {
      title: "AutoCAD Design",
      icon: "cube",
      description: "Expert AutoCAD services for precise technical drawings and 3D modeling solutions.",
      features: [
        "Technical Drawings",
        "3D Modeling",
        "Project Documentation",
        "Design Review"
      ]
    },
    {
      title: "Virtual Assistance",
      icon: "support",
      description: "Comprehensive virtual support services to help businesses operate efficiently and grow.",
      features: [
        "Email Management",
        "Calendar Organization",
        "Task Coordination",
        "Document Preparation"
      ]
    },
    {
      title: "Project Management",
      icon: "presentation",
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
