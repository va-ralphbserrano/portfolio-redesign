import resumePdf from '@/shared/assets/docs/resume.pdf';
import heroImage from '@/shared/assets/images/hero.png';

export const heroData = {
  title: {
    prefix: "Hello, I'm",
    name: "Ralph Bernard",
    suffix: "Serrano"
  },
  subtitle: "Technical Designer & Virtual Solutions Expert",
  description: "Bridging technical expertise with virtual assistance excellence. With 13+ years of experience, I specialize in AutoCAD Technical Design, Modern Web Development, and Comprehensive Virtual Assistance. I transform complex challenges into efficient, scalable solutions that empower businesses to thrive in the digital age.",
  stats: [
    {
      value: "13+",
      label: "Years of Expertise",
    },
    {
      value: "100+",
      label: "Successful Projects",
    },
    {
      value: "50+",
      label: "Client Partnerships",
    },
    {
      value: "3",
      label: "Core Services",
    },
  ],
  cta: {
    primary: {
      text: "Let's Collaborate",
      href: "/contact",
    },
    secondary: {
      text: "View Portfolio",
      href: "/portfolio",
    },
    resume: {
      text: "Download CV",
      href: resumePdf
    },
  },
  image: {
    src: heroImage,
    alt: "Ralph Bernard Serrano - Technical Designer & Virtual Solutions Expert"
  }
} as const;

// Export types
export interface HeroData {
  title: {
    prefix: string;
    name: string;
    suffix: string;
  };
  subtitle: string;
  description: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
    resume: {
      text: string;
      href: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}
