import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const CertificatesSection = styled.section`
  position: relative;
  padding: 4rem 0;
`;

export const CertificatesContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

export const CertificatesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

export const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CertificateCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const CertificateImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
`;

export const CertificateContent = styled.div`
  padding: 1.5rem;
`;

export const CertificateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
`;

export const CertificateIssuer = styled.p`
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

export const CertificateDate = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
`;

export const CertificateLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: var(--primary-hover);
  }
`;
