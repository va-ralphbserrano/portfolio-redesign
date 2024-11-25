import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { loadScript, loadScriptsSequentially } from '@/shared/utils/scriptLoader';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  metaConfig: {
    siteUrl: string;
    title: string;
    description: string;
    author: string;
    socialMedia: {
      github: string;
      linkedin: string;
      youtube: string;
      facebook: string;
      instagram: string;
      upwork: string;
    };
  };
  route: {
    path: string;
    meta: {
      title: string;
      description: string;
    };
  };
  servicesData?: {
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Ralph Serrano - Full Stack Developer',
  description = 'Full Stack Developer specializing in React, TypeScript, and Node.js. Creating modern web applications with a focus on performance and user experience.',
  keywords = ['Full Stack Developer', 'React', 'TypeScript', 'Node.js', 'Web Development'],
  image = '/assets/images/og-image.jpg',
  url = 'https://ralphserrano.dev',
  metaConfig,
  route,
  servicesData,
}) => {
  const { meta } = route;

  useEffect(() => {
    // Load third-party scripts with proper loading strategies
    loadScriptsSequentially([
      {
        src: 'https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js',
        options: { defer: true }
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js',
        options: { defer: true }
      }
    ]).catch(console.error);
  }, []);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Ralph Bernard Serrano" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      {/* Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Local Font Loading Optimization */}
      <link 
        rel="preload" 
        href="/fonts/Inter-Regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous"
      />

      {/* Font Declarations */}
      <style>
        {`
          @font-face {
            font-family: 'Inter';
            font-weight: 400;
            font-display: swap;
            font-style: normal;
            src: url('/fonts/Inter-Regular.woff2') format('woff2');
          }

          @font-face {
            font-family: 'Inter';
            font-weight: 500;
            font-display: swap;
            font-style: normal;
            src: url('/fonts/Inter-Medium.woff2') format('woff2');
          }

          @font-face {
            font-family: 'Inter';
            font-weight: 600;
            font-display: swap;
            font-style: normal;
            src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
          }

          @font-face {
            font-family: 'Inter';
            font-weight: 700;
            font-display: swap;
            font-style: normal;
            src: url('/fonts/Inter-Bold.woff2') format('woff2');
          }
        `}
      </style>

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* PWA Tags */}
      <meta name="theme-color" content="#2ecc71" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={title} />

      {/* Generate FAQ Schema if servicesData exists */}
      {servicesData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": servicesData.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
