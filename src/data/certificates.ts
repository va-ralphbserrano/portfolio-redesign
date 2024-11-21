import amazonVa from '@/assets/images/certificate/amazon-va.png';
import apprenticeship from '@/assets/images/certificate/apprenticeship-certificate.png';
import contentMarketing from '@/assets/images/certificate/content-marketing.png';
import freelancingBrand from '@/assets/images/certificate/freelancing-brand.png';
import masterclass from '@/assets/images/certificate/masterclass-certificate.png';
import websiteManagement from '@/assets/images/certificate/website-management.png';

interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  issuer: string;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Virtual Assistant Masterclass',
    description: 'Comprehensive training in virtual assistance, covering project management, client communication, and productivity tools. Achieved Gold Certificate of Completion.',
    image: masterclass,
    issuer: 'Surge Freelancing Marketplace'
  },
  {
    id: 'cert-2',
    title: 'Amazon Virtual Assistant Certification',
    description: 'Specialized certification in Amazon marketplace management, product listing optimization, and customer service excellence.',
    image: amazonVa,
    issuer: 'Surge Freelancing Marketplace'
  },
  {
    id: 'cert-3',
    title: 'Content Marketing Specialist',
    description: 'Advanced training in content strategy, SEO optimization, and digital marketing best practices for business growth.',
    image: contentMarketing,
    issuer: 'Surge Freelancing Marketplace'
  },
  {
    id: 'cert-4',
    title: 'Website Management Professional',
    description: 'Certification in website maintenance, content management systems, and technical optimization for optimal website performance.',
    image: websiteManagement,
    issuer: 'Surge Freelancing Marketplace'
  },
  {
    id: 'cert-5',
    title: 'Freelancing & Personal Branding',
    description: 'Comprehensive course on building a successful freelancing career and developing a strong personal brand in the digital marketplace.',
    image: freelancingBrand,
    issuer: 'Surge Freelancing Marketplace'
  },
  {
    id: 'cert-6',
    title: 'Digital Marketing Apprenticeship',
    description: 'Intensive apprenticeship program focusing on practical digital marketing skills, including SEO, content strategy, and social media management.',
    image: apprenticeship,
    issuer: 'Surge Freelancing Marketplace'
  }
];
