export const metaConfig = {
  title: 'Ralph Bernard Serrano - Professional Portfolio',
  description: 'Professional portfolio showcasing web development, virtual assistance, video editing, and AutoCAD services',
  author: 'Ralph Bernard Serrano',
  siteUrl: 'https://va-ralphbserrano.github.io',
  themeColor: '#2ecc71',
  socialMedia: {
    github: 'https://github.com/va-ralphbserrano',
    linkedin: 'https://www.linkedin.com/in/ralphbserrano/',
    youtube: 'https://www.youtube.com/@RalphBernardSerrano',
    facebook: 'https://www.facebook.com/va.ralphbserrano/',
    instagram: 'https://www.instagram.com/half21dead/',
    upwork: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1'
  },
  contact: {
    email: 'ralph.b.serrano@gmail.com',
    phone: '+63 995 846 2469',
    location: 'Muntinlupa City, Philippines'
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
