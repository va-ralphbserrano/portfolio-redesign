import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'My First Portfolio',
      category: 'web',
      image: '/images/portfolio/portfolio-1.png',
      description: 'My First Portfolio Design Using Wix',
      technologies: ['Wix', 'Web Design'],
      demoLink: 'https://ralphbserrano.wixsite.com/thrive',
      type: 'Website'
    },
    {
      id: 2,
      title: 'Second Portfolio',
      category: 'web',
      image: '/images/portfolio/portfolio-2.png',
      description: 'My Second Portfolio Using Canva',
      technologies: ['Canva', 'Web Design'],
      demoLink: 'https://rbsthriveportfolio.my.canva.site/',
      type: 'Website'
    },
    {
      id: 3,
      title: 'Wix Website',
      category: 'web',
      image: '/images/portfolio/portfolio-3.png',
      description: 'Website Created Using Wix',
      technologies: ['Wix', 'Web Design'],
      demoLink: 'https://jbyissbfb.wixsite.com/jbyiss',
      type: 'Website'
    },
    {
      id: 4,
      title: 'Email Management',
      category: 'management',
      image: '/images/portfolio/portfolio-4.png',
      description: 'Email Management',
      technologies: ['Email', 'Organization'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Management'
    },
    {
      id: 5,
      title: 'Project Management',
      category: 'management',
      image: '/images/portfolio/portfolio-5.png',
      description: 'Trello/Project Management',
      technologies: ['Trello', 'Project Management'],
      demoLink: 'https://drive.google.com/drive/folders/1Fh69DgwzEqQnxiKRVe1tcVdGDdqC3Ue0?usp=sharing',
      type: 'Management'
    },
    {
      id: 6,
      title: 'Calendar Management',
      category: 'management',
      image: '/images/portfolio/portfolio-6.png',
      description: 'Travel/Calendar Management and Appointment Setting',
      technologies: ['Calendar', 'Scheduling'],
      demoLink: 'https://drive.google.com/drive/folders/1XEGWaVMGvh1O-NnxmJydV0KIOsChHlLm?usp=sharing',
      type: 'Management'
    },
    {
      id: 7,
      title: 'Content Creation',
      category: 'content',
      image: '/images/portfolio/portfolio-7.png',
      description: 'Content Creation',
      technologies: ['Content Writing', 'Design'],
      demoLink: 'https://drive.google.com/drive/folders/19x3cIw20fqqhX73ZV83eEMueysmgswBK?usp=sharing',
      type: 'Content'
    },
    {
      id: 8,
      title: 'Apprenticeship Program',
      category: 'education',
      image: '/images/portfolio/portfolio-8.png',
      description: 'Apprenticeship Program',
      technologies: ['Training', 'Development'],
      demoLink: 'https://drive.google.com/drive/folders/1vr3zsSHroynxjWyIkpqRSlt1raSJSFg-?usp=sharing',
      type: 'Education'
    },
    {
      id: 9,
      title: 'MVA Class Course',
      category: 'education',
      image: '/images/portfolio/portfolio-9.png',
      description: 'MVA Class Course',
      technologies: ['Virtual Assistant', 'Training'],
      demoLink: 'https://drive.google.com/drive/folders/10vyiRW-F4qs1tsydPxiHhHpWJbEHxfDH?usp=sharing',
      type: 'Education'
    }
  ];

  const categories = ['all', 'web', 'management', 'content', 'education'];

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">My Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my work, including web development, management, and educational projects.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-6 py-2 rounded-full capitalize transition-colors duration-200 ${
                  selectedFilter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative pt-[56.25%]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
