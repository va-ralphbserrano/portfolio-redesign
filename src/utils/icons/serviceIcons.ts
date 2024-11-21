import {
  HiCode,
  HiDesktopComputer,
  HiVideoCamera,
  HiCube,
  HiSupport,
  HiPresentationChartLine,
  HiPencil,
  HiTemplate,
  HiCog,
  HiSearch,
  HiMail,
  HiCalendar
} from 'react-icons/hi';

export const serviceIcons = {
  code: () => HiCode,
  desktop: () => HiDesktopComputer,
  video: () => HiVideoCamera,
  cube: () => HiCube,
  support: () => HiSupport,
  presentation: () => HiPresentationChartLine,
  pencil: () => HiPencil,
  template: () => HiTemplate,
  cog: () => HiCog,
  search: () => HiSearch,
  mail: () => HiMail,
  calendar: () => HiCalendar
} as const;
