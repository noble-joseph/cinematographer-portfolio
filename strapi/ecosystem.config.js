module.exports = {
  apps: [
    {
      name: 'cinematographer-portfolio-api',
      cwd: './',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
      },
    },
  ],
};