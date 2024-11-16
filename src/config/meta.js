export const metaConfig = {
  title: 'Ralph Bernard Serrano - Professional Portfolio',
  description: 'Professional portfolio showcasing web design, video editing, and AutoCAD services',
  author: 'Ralph Bernard Serrano',
  siteUrl: 'https://your-portfolio-url.com',
  themeColor: '#2ecc71',
  socialMedia: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    instagram: 'https://instagram.com/yourusername'
  },
  contact: {
    email: 'hello@yourwebsite.com',
    location: 'Your Location'
  },
  openGraph: {
    type: 'website',
    image: '/assets/images/og-image.jpg',
    imageAlt: 'Ralph Bernard Serrano Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    image: '/assets/images/twitter-image.jpg'
  }
};

export const loadMetaTags = () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'author');
  meta.setAttribute('content', metaConfig.author);
  document.head.appendChild(meta);

  // Open Graph
  const ogTags = {
    'og:title': metaConfig.title,
    'og:description': metaConfig.description,
    'og:type': metaConfig.openGraph.type,
    'og:url': metaConfig.siteUrl,
    'og:image': metaConfig.openGraph.image,
    'og:image:alt': metaConfig.openGraph.imageAlt
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    const tag = document.createElement('meta');
    tag.setAttribute('property', property);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  });

  // Twitter
  const twitterTags = {
    'twitter:card': metaConfig.twitter.card,
    'twitter:title': metaConfig.title,
    'twitter:description': metaConfig.description,
    'twitter:image': metaConfig.twitter.image
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    const tag = document.createElement('meta');
    tag.setAttribute('name', name);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  });
};
