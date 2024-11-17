import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceItem {
  title: string;
  company: string;
  year: string;
  description: string;
}

interface ExperienceProps extends WithClassName {}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    year: '2021 - Present',
    description: 'Leading development of enterprise applications using React, TypeScript, and Node.js.'
  },
  {
    title: 'Software Engineer',
    company: 'Startup Inc',
    year: '2019 - 2021',
    description: 'Developed and maintained full-stack web applications using modern technologies.'
  },
  {
    title: 'Junior Developer',
    company: 'Web Agency',
    year: '2017 - 2019',
    description: 'Built responsive websites and web applications for various clients.'
  }
];

export const Experience: React.FC<ExperienceProps> = ({ className }) => {
  return (
    <div className={classNames('space-y-8', className)}>
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          experience={experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  );
};

Experience.displayName = 'Experience';

export default Experience;
