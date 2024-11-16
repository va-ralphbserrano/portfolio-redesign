import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const personalInfo = [
    { label: 'Birthday', value: '18 June 1987' },
    { label: 'Age', value: new Date().getFullYear() - 1987 },
    { label: 'Website', value: 'va-ralphbserrano.github.io' },
    { label: 'Email', value: 'ralphbserrano@gmail.com' },
    { label: 'Phone', value: '+63 945 849 0223' },
    { label: 'City', value: 'Cebu City, Philippines' },
    { label: 'Freelance', value: 'Available' }
  ];

  const skills = [
    { name: 'AutoCAD Design', percentage: 95 },
    { name: 'Business Administration', percentage: 90 },
    { name: 'Web Design', percentage: 85 },
    { name: 'Video Editing', percentage: 80 },
    { name: 'Web Development', percentage: 75 },
    { name: 'Project Management', percentage: 85 }
  ];

  const tools = {
    'Design Tools': [
      'AutoCAD',
      'Adobe Photoshop',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'Canva',
      'Figma'
    ],
    'Development Tools': [
      'Visual Studio Code',
      'Git',
      'GitHub',
      'HTML/CSS',
      'JavaScript',
      'React'
    ],
    'Project Management': [
      'Trello',
      'Asana',
      'ClickUp',
      'Monday.com',
      'Notion',
      'Microsoft Project'
    ],
    'Communication': [
      'HubSpot',
      'Slack',
      'Microsoft Teams',
      'Zoom',
      'Google Meet',
      'Discord'
    ]
  };

  const education = [
    {
      title: "Masterclass Virtual Assistant Course",
      school: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Earned a Gold Certificate of Completion and gained essential skills for virtual assistance."
    },
    {
      title: "Advance Diploma in Gaming and Animation Technology",
      school: "Informatics College Northgate",
      year: "2012 - 2013",
      description: "Gained a solid foundation in game design principles, animation techniques, and digital media production."
    },
    {
      title: "Bachelor of Science in Electronics and Communications Engineering",
      school: "Mapúa Institute of Technology",
      year: "2004 - 2005",
      description: "Developed a comprehensive understanding of electronic systems, telecommunications, and circuit design."
    }
  ];

  const experiences = [
    {
      title: "Executive Assistant Apprenticeship Program",
      company: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Completed an intensive program focused on developing essential skills for virtual assistance."
    },
    {
      title: "AutoCAD Designer & Office Administrator",
      company: "JBY Industrial Supply and Services",
      year: "2011 - 2020",
      description: "Managed multiple AutoCAD design projects and streamlined workflows, achieving a 25% increase in operational efficiency."
    },
    {
      title: "Owner",
      company: "REHUB Internet Café",
      year: "2007 - 2011",
      description: "Oversaw daily operations, ensuring exceptional customer service and satisfaction."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">About Me</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              I'm Ralph Bernard Serrano - Virtual Assistant & Web Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a detail-oriented and organized virtual assistant with a background in AutoCAD design, 
              web design, web development, and video editing, I help businesses and entrepreneurs achieve 
              their goals by providing high-quality support. With expertise in web management, social 
              media management, email management, and content creation, I am passionate about helping 
              clients grow their online presence and succeed in a competitive market.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              With a background in business ownership and administration, I have honed my customer service 
              skills, developed strong problem-solving abilities, and gained valuable experience in managing 
              teams and projects efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Personal Info</h3>
              <div className="grid grid-cols-1 gap-4">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{info.label}:</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{info.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{skill.name}</span>
                      <span className="text-gray-800 dark:text-gray-200">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary-600 pl-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.title}</h4>
                    <p className="text-primary-600 font-medium">{edu.school}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{edu.year}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary-600 pl-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.title}</h4>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{exp.year}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">Tools I'm Familiar With</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(tools).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{category}</h4>
                  <ul className="space-y-2">
                    {items.map((tool, index) => (
                      <li
                        key={index}
                        className="text-gray-600 dark:text-gray-400 flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
