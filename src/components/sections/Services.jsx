import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiDesktopComputer, HiVideoCamera, HiCube, HiSupport, HiPresentationChartLine } from 'react-icons/hi';

const Services = () => {
  const services = [
    {
      icon: <HiCode className="w-8 h-8" />,
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
      icon: <HiDesktopComputer className="w-8 h-8" />,
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
      icon: <HiVideoCamera className="w-8 h-8" />,
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
      icon: <HiCube className="w-8 h-8" />,
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
      icon: <HiSupport className="w-8 h-8" />,
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
      icon: <HiPresentationChartLine className="w-8 h-8" />,
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

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">My Services</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering comprehensive digital solutions to help businesses thrive in the modern landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="mb-6 text-primary-500 dark:text-primary-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.1) }}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
