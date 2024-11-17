import { IconType } from 'react-icons';
import {
  HiCode,
  HiDesktopComputer,
  HiVideoCamera,
  HiCube,
  HiSupport,
  HiPresentationChartBar,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiGlobe,
  HiCalendar,
  HiStatusOnline
} from 'react-icons/hi';
import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const iconMap: Record<string, IconType> = {
  code: HiCode,
  desktop: HiDesktopComputer,
  video: HiVideoCamera,
  cube: HiCube,
  support: HiSupport,
  chart: HiPresentationChartBar,
  mail: HiMail,
  phone: HiPhone,
  location: HiLocationMarker,
  globe: HiGlobe,
  calendar: HiCalendar,
  status: HiStatusOnline,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  upwork: SiUpwork
};

export const getTechIcon = (name: string): IconType => {
  return iconMap[name] || HiCode;
};
