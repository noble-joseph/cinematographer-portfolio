module.exports = ({ env }) => ({
  settings: {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:1337',
        // Add your production domains here
        'https://your-portfolio-domain.com',
        'https://www.your-portfolio-domain.com'
      ],
      credentials: true,
    },
    parser: {
      enabled: true,
      multipart: true,
    },
  },
});