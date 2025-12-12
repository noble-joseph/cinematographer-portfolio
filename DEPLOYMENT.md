# 🚀 Portfolio Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Strapi Deployment](#strapi-deployment)
4. [React Frontend Deployment](#react-frontend-deployment)
5. [Nginx Configuration](#nginx-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Domain Configuration](#domain-configuration)
8. [Security Configuration](#security-configuration)
9. [Monitoring Setup](#monitoring-setup)
10. [Backup Strategy](#backup-strategy)
11. [Maintenance](#maintenance)

## Prerequisites

### System Requirements
- Ubuntu 20.04 LTS or newer (recommended)
- Node.js v16 or newer
- npm v8 or newer
- PostgreSQL v12 or newer (recommended)
- Nginx
- PM2 (Process Manager)

### Domain and SSL
- Registered domain name
- SSL certificate (Let's Encrypt or commercial)

### Server Access
- SSH access to server
- sudo privileges
- Firewall access

## Server Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Packages
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 globally
sudo npm install -g pm2

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 3. Create Application User
```bash
# Create dedicated user for applications
sudo adduser portfolio
sudo usermod -aG sudo portfolio

# Switch to portfolio user
su - portfolio
```

### 4. Set Up Directory Structure
```bash
mkdir -p /var/www/portfolio
mkdir -p /var/log/strapi
chown -R portfolio:portfolio /var/www/portfolio
chown -R portfolio:portfolio /var/log/strapi
```

## Strapi Deployment

### 1. Clone Repository
```bash
cd /var/www
git clone https://github.com/yourusername/your-strapi-repo.git strapi
cd strapi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env` file:
```bash
cp .env.example .env
nano .env
```

Update with production values:
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_portfolio
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_secure_password

# Security
JWT_SECRET=your_generated_jwt_secret
ADMIN_JWT_SECRET=your_generated_admin_jwt_secret
API_TOKEN_SALT=your_generated_api_token_salt
APP_KEYS=key1,key2,key3,key4
```

### 4. Set Up Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE strapi_portfolio;
CREATE USER strapi_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE strapi_portfolio TO strapi_user;
\q
```

### 5. Build Strapi Admin
```bash
npm run build
```

### 6. Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## React Frontend Deployment

### 1. Clone Repository
```bash
cd /var/www
git clone https://github.com/yourusername/your-react-repo.git portfolio
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env.production`:
```bash
cp .env.example .env.production
nano .env.production
```

Update with production values:
```env
REACT_APP_STRAPI_URL=https://api.your-domain.com
NODE_ENV=production
```

### 4. Build for Production
```bash
npm run build
```

### 5. Verify Build
```bash
ls -la build/
# Should contain index.html and static assets
```

## Nginx Configuration

### 1. Create Configuration File
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add configuration from `nginx.conf`:
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server block
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Serve React static files
    location / {
        root /var/www/portfolio/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Strapi
    location /api/ {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded media
    location /uploads/ {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate Setup

### Option 1: Let's Encrypt (Free)
```bash
# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test renewal
sudo certbot renew --dry-run

# Set up auto-renewal
sudo crontab -e
# Add line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Commercial SSL
1. Purchase SSL certificate
2. Upload certificate files to server
3. Update Nginx configuration with certificate paths

## Domain Configuration

### DNS Records
Configure these DNS records with your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | Your Server IP | 300 |
| A | www | Your Server IP | 300 |
| A | api | Your Server IP | 300 |

### Verification
```bash
# Check DNS propagation
nslookup your-domain.com
dig your-domain.com

# Test HTTPS access
curl -I https://your-domain.com
```

## Security Configuration

### 1. Firewall Setup (UFW)
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### 2. Generate Secure Secrets
```bash
# Generate JWT secret
openssl rand -base64 32

# Generate API token salt
openssl rand -base64 32

# Generate app keys
openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n'
```

### 3. Rate Limiting
Install rate limit plugin for Strapi:
```bash
cd /var/www/strapi
npm install strapi-plugin-rate-limit
```

### 4. Content Security Policy
Update Strapi security configuration as outlined in `strapi-security.md`.

## Monitoring Setup

### 1. Health Check Script
Deploy `health-check.sh` to server:
```bash
chmod +x health-check.sh
./health-check.sh
```

### 2. Cron Jobs
Set up automated monitoring:
```bash
crontab -e
```

Add entries:
```bash
# Health check every 15 minutes
*/15 * * * * /path/to/health-check.sh >> /var/log/portfolio-health.log 2>&1

# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/portfolio-backup.log 2>&1
```

### 3. External Monitoring
Set up services like:
- UptimeRobot for uptime monitoring
- Google Analytics for traffic analysis
- GTmetrix for performance monitoring

## Backup Strategy

### 1. Database Backup
```bash
#!/bin/bash
# backup-db.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U strapi_user -h localhost strapi_portfolio > /backups/db_backup_$DATE.sql
```

### 2. File Backup
```bash
#!/bin/bash
# backup-files.sh
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/files_backup_$DATE.tar.gz /var/www/portfolio/build /var/www/strapi/public/uploads
```

### 3. Automated Backups
Add to crontab:
```bash
# Daily database backup
0 1 * * * /path/to/backup-db.sh

# Weekly full backup
0 2 * * 0 /path/to/backup-files.sh && /path/to/backup-db.sh
```

## Maintenance

### 1. Updating Strapi
```bash
# Stop application
pm2 stop cinematographer-portfolio-api

# Pull latest changes
cd /var/www/strapi
git pull origin main

# Install dependencies
npm install

# Rebuild admin
npm run build

# Restart application
pm2 restart cinematographer-portfolio-api
```

### 2. Updating React Frontend
```bash
# Pull latest changes
cd /var/www/portfolio
git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

### 3. Log Rotation
Configure log rotation in `/etc/logrotate.d/portfolio`:
```bash
/var/log/strapi/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 portfolio portfolio
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 4. Security Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
cd /var/www/strapi && npm audit fix
cd /var/www/portfolio && npm audit fix

# Check for vulnerabilities
npm install -g nsp
nsp check
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**
   - Check if Strapi is running: `pm2 list`
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

2. **404 Not Found**
   - Verify React build files exist: `ls /var/www/portfolio/build`
   - Check Nginx configuration: `sudo nginx -t`

3. **Database Connection Issues**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check database credentials in `.env`

4. **SSL Certificate Issues**
   - Check certificate expiration: `sudo certbot certificates`
   - Renew if needed: `sudo certbot renew`

### Useful Commands

```bash
# Check application status
pm2 list
pm2 logs cinematographer-portfolio-api

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check disk space
df -h

# Check memory usage
free -h

# Restart services
sudo systemctl restart nginx
pm2 restart all
```

## Emergency Procedures

### 1. Rolling Back
If deployment fails:
```bash
# Rollback Strapi
cd /var/www/strapi
git checkout HEAD~1
npm install
pm2 restart cinematographer-portfolio-api

# Rollback React
cd /var/www/portfolio
git checkout HEAD~1
npm install
npm run build
sudo systemctl reload nginx
```

### 2. Disaster Recovery
Restore from backups:
```bash
# Restore database
psql -U strapi_user -h localhost strapi_portfolio < db_backup.sql

# Restore files
tar -xzf files_backup.tar.gz -C /
```

## Performance Optimization

### 1. Nginx Caching
Add to Nginx configuration:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. Database Indexing
In Strapi, add indexes to frequently queried fields.

### 3. Image Optimization
Use tools like ImageMagick to optimize uploaded images:
```bash
# Optimize images
find /var/www/strapi/public/uploads -name "*.jpg" -exec mogrify -quality 85 {} \;
```

## Conclusion

Your cinematographer portfolio is now ready for production deployment! Follow this guide step by step, and your portfolio will be securely deployed with proper monitoring and maintenance procedures in place.

Remember to:
- Test thoroughly in staging before production
- Keep all software updated
- Monitor application performance
- Maintain regular backups
- Review security regularly

For ongoing maintenance, refer to the maintenance section above and schedule regular reviews of your deployment.