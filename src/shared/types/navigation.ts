export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}
