import React from 'react';
import { motion } from 'framer-motion';
import { FaPencilRuler, FaVideo, FaFigma, FaGitAlt, FaGithub, FaHtml5, FaReact, FaGoogle } from 'react-icons/fa';
import { 
  SiAutodesk, 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiCanva, 
  SiVisualstudiocode, 
  SiJavascript,
  SiTrello,
  SiMicrosoft,
  SiSlack,
  SiAsana,
  SiNotion
} from 'react-icons/si';

const Tools = () => {
  const tools = {
    'Design & Media': [
      { name: 'AutoCAD', icon: <FaPencilRuler className="w-6 h-6" /> },
      { name: 'Autodesk Inventor', icon: <SiAutodesk className="w-6 h-6" /> },
      { name: 'Adobe Photoshop', icon: <SiAdobephotoshop className="w-6 h-6" /> },
      { name: 'Adobe Premiere Pro', icon: <SiAdobepremierepro className="w-6 h-6" /> },
      { name: 'DaVinci Resolve', icon: <FaVideo className="w-6 h-6" /> },
      { name: 'Canva', icon: <SiCanva className="w-6 h-6" /> },
      { name: 'Figma', icon: <FaFigma className="w-6 h-6" /> }
    ],
    'Development': [
      { name: 'VS Code', icon: <SiVisualstudiocode className="w-6 h-6" /> },
      { name: 'Git', icon: <FaGitAlt className="w-6 h-6" /> },
      { name: 'GitHub', icon: <FaGithub className="w-6 h-6" /> },
      { name: 'HTML/CSS', icon: <FaHtml5 className="w-6 h-6" /> },
      { name: 'JavaScript', icon: <SiJavascript className="w-6 h-6" /> },
      { name: 'React', icon: <FaReact className="w-6 h-6" /> }
    ],
    'Productivity': [
      { name: 'Microsoft Office', icon: <SiMicrosoft className="w-6 h-6" /> },
      { name: 'Google Workspace', icon: <FaGoogle className="w-6 h-6" /> },
      { name: 'Slack', icon: <SiSlack className="w-6 h-6" /> },
      { name: 'Trello', icon: <SiTrello className="w-6 h-6" /> },
      { name: 'Asana', icon: <SiAsana className="w-6 h-6" /> },
      { name: 'Notion', icon: <SiNotion className="w-6 h-6" /> }
    ]
  };

  return (
    <div className="space-y-12">
      {Object.entries(tools).map(([category, toolsList], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {toolsList.map((tool, toolIndex) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: toolIndex * 0.1 }}
                className="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-3">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Tools;
