import React from 'react';
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
  code: () => React.createElement(HiCode, { className: "w-6 h-6" }),
  desktop: () => React.createElement(HiDesktopComputer, { className: "w-6 h-6" }),
  video: () => React.createElement(HiVideoCamera, { className: "w-6 h-6" }),
  cube: () => React.createElement(HiCube, { className: "w-6 h-6" }),
  support: () => React.createElement(HiSupport, { className: "w-6 h-6" }),
  presentation: () => React.createElement(HiPresentationChartLine, { className: "w-6 h-6" }),
  pencil: () => React.createElement(HiPencil, { className: "w-6 h-6" }),
  template: () => React.createElement(HiTemplate, { className: "w-6 h-6" }),
  cog: () => React.createElement(HiCog, { className: "w-6 h-6" }),
  search: () => React.createElement(HiSearch, { className: "w-6 h-6" }),
  mail: () => React.createElement(HiMail, { className: "w-6 h-6" }),
  calendar: () => React.createElement(HiCalendar, { className: "w-6 h-6" })
} as const;
