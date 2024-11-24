export interface NavigationLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationSection {
  name: string;
  links: NavigationLink[];
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavigationLink[];
}
