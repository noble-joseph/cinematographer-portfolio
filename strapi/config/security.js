module.exports = {
  jwt: {
    expiresIn: '7d',
  },
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'connect-src': ["'self'", 'https:'],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'dl.airtable.com',
        'your-strapi-domain.com', // Replace with your Strapi domain
        'your-portfolio-domain.com' // Replace with your portfolio domain
      ],
      'media-src': [
        "'self'",
        'data:',
        'blob:',
        'dl.airtable.com',
        'your-strapi-domain.com', // Replace with your Strapi domain
        'your-portfolio-domain.com' // Replace with your portfolio domain
      ],
      upgradeInsecureRequests: null,
    },
  },
};