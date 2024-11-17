import heroImage from '../assets/images/hero.png';
import resumePdf from '../assets/docs/resume.pdf';

export const heroData = {
  title: {
    prefix: "Hi! I'm",
    name: "Ralph Bernard",
    suffix: "Serrano"
  },
  subtitle: "Virtual Assistant & Web Developer",
  description: "I'm a versatile professional with over 13 years of experience in AutoCAD Design, Video Editing, and Virtual Assistance. I help businesses grow by providing top-notch services and innovative solutions.",
  stats: [
    {
      value: "13+",
      label: "Years Experience"
    },
    {
      value: "100+",
      label: "Projects Completed"
    },
    {
      value: "50+",
      label: "Happy Clients"
    }
  ],
  services: [
    {
      icon: "autocad",
      name: "AutoCAD Design"
    },
    {
      icon: "video",
      name: "Video Editing"
    },
    {
      icon: "management",
      name: "VA Services"
    }
  ],
  cta: {
    primary: {
      text: "Download CV",
      link: resumePdf
    },
    secondary: {
      text: "Contact Me",
      link: "/contact"
    }
  },
  image: {
    src: heroImage,
    alt: "Ralph Bernard Serrano"
  }
} as const;

export type HeroData = typeof heroData;
