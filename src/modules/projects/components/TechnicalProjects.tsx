import { ProjectCard } from '@/components/common/ProjectCard';
import { getTechnicalProjects } from '@/data/projects';
import { motion } from 'framer-motion';
import { fadeInVariants } from '@/shared/animations';
import { Project } from '@/types/project';

export const TechnicalProjects = () => {
  const projects = getTechnicalProjects();

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project: Project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
};
