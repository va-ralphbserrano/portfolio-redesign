import { classNames } from '@/shared/utils/helpers';
import { WithClassName } from '@/types/component';

interface ExperienceTimelineNodeProps extends WithClassName {
  isLast: boolean;
}

export const ExperienceTimelineNode: React.FC<ExperienceTimelineNodeProps> = ({
  isLast,
  className
}) => {
  return (
    <div className={classNames('relative', className)}>
      <div className="absolute left-0 w-px h-full bg-gray-200 dark:bg-gray-700">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500" />
        {!isLast && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
    </div>
  );
};

ExperienceTimelineNode.displayName = 'ExperienceTimelineNode';

export default ExperienceTimelineNode;
