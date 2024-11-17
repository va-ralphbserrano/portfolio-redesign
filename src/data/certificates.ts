import amazonVa from '@/assets/images/certificate/amazon-va.png';
import apprenticeship from '@/assets/images/certificate/apprenticeship-certificate.png';
import contentMarketing from '@/assets/images/certificate/content-marketing.png';
import freelancingBrand from '@/assets/images/certificate/freelancing-brand.png';
import masterclass from '@/assets/images/certificate/masterclass-certificate.png';
import websiteManagement from '@/assets/images/certificate/website-management.png';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Full Stack Development',
    issuer: 'Masterclass Academy',
    date: 'December 2023',
    image: masterclass,
    link: 'https://masterclass.com/verify/cert-1'
  },
  {
    id: 'cert-2',
    title: 'Amazon Virtual Assistant',
    issuer: 'Amazon',
    date: 'November 2023',
    image: amazonVa,
    link: 'https://amazon.com/verify/cert-2'
  },
  {
    id: 'cert-3',
    title: 'Content Marketing',
    issuer: 'Digital Marketing Institute',
    date: 'October 2023',
    image: contentMarketing,
    link: 'https://dmi.com/verify/cert-3'
  },
  {
    id: 'cert-4',
    title: 'Website Management',
    issuer: 'Web Development Institute',
    date: 'September 2023',
    image: websiteManagement,
    link: 'https://wdi.com/verify/cert-4'
  },
  {
    id: 'cert-5',
    title: 'Freelancing & Branding',
    issuer: 'Freelance Academy',
    date: 'August 2023',
    image: freelancingBrand,
    link: 'https://freelance.com/verify/cert-5'
  },
  {
    id: 'cert-6',
    title: 'Web Development Apprenticeship',
    issuer: 'Tech Academy',
    date: 'July 2023',
    image: apprenticeship,
    link: 'https://techacademy.com/verify/cert-6'
  }
];
