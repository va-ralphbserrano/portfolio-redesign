import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import portfolio images
import portfolio1 from '@images/portfolio/portfolio-1.png';
import portfolio2 from '@images/portfolio/portfolio-2.png';
import portfolio3 from '@images/portfolio/portfolio-3.png';
import portfolio4 from '@images/portfolio/portfolio-4.png';
import portfolio5 from '@images/portfolio/portfolio-5.png';
import portfolio6 from '@images/portfolio/portfolio-6.png';
import portfolio7 from '@images/portfolio/portfolio-7.png';
import portfolio8 from '@images/portfolio/portfolio-8.png';
import portfolio9 from '@images/portfolio/portfolio-9.png';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'My First Portfolio',
      category: 'web',
      image: portfolio1,
      description: 'My First Portfolio Design Using Wix',
      technologies: ['Wix', 'Web Design'],
      demoLink: 'https://ralphbserrano.wixsite.com/thrive',
      type: 'Website'
    },
    {
      id: 2,
      title: 'Second Portfolio',
      category: 'web',
      image: portfolio2,
      description: 'My Second Portfolio Using Canva',
      technologies: ['Canva', 'Web Design'],
      demoLink: 'https://rbsthriveportfolio.my.canva.site/',
      type: 'Website'
    },
    {
      id: 3,
      title: 'Wix Website',
      category: 'web',
      image: portfolio3,
      description: 'Website Created Using Wix',
      technologies: ['Wix', 'Web Design'],
      demoLink: 'https://jbyissbfb.wixsite.com/jbyiss',
      type: 'Website'
    },
    {
      id: 4,
      title: 'Email Management',
      category: 'management',
      image: portfolio4,
      description: 'Email Management',
      technologies: ['Email', 'Organization'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Management'
    },
    {
      id: 5,
      title: 'Project Management',
      category: 'management',
      image: portfolio5,
      description: 'Project Management',
      technologies: ['Project', 'Organization'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Management'
    },
    {
      id: 6,
      title: 'AutoCAD Design',
      category: 'design',
      image: portfolio6,
      description: 'AutoCAD Design',
      technologies: ['AutoCAD', 'Design'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Design'
    },
    {
      id: 7,
      title: 'Social Media Management',
      category: 'management',
      image: portfolio7,
      description: 'Social Media Management',
      technologies: ['Social Media', 'Management'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Management'
    },
    {
      id: 8,
      title: 'Video Editing',
      category: 'design',
      image: portfolio8,
      description: 'Video Editing',
      technologies: ['Video', 'Editing'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Design'
    },
    {
      id: 9,
      title: 'Content Creation',
      category: 'design',
      image: portfolio9,
      description: 'Content Creation',
      technologies: ['Content', 'Creation'],
      demoLink: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing',
      type: 'Design'
    }
  ];

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
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my projects and professional work
          </p>
        </motion.div>

        <div className="flex justify-center mb-12 space-x-4">
          {['all', 'web', 'design', 'management'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full capitalize transition-colors duration-200 ${
                selectedFilter === filter
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative pt-[56.25%] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">View Project</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
