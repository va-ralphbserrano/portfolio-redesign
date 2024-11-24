export interface Certificate {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  date: string;
  issuer: string;
  url?: string;
  credentialId?: string;
}
