import { classNames } from '../../utils/helpers';
import { ScrollLinkProps } from './types';

export const ScrollLink: React.FC<ScrollLinkProps> = ({
  to,
  children,
  className,
  offset = 0,
  duration = 500
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(to);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={classNames('cursor-pointer', className)}
    >
      {children}
    </a>
  );
};

// Easing function
const easeInOutCubic = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

ScrollLink.displayName = 'ScrollLink';

export default ScrollLink;
