# Strapi Security Implementation Guide

## 1. Environment Variables Security

### Generate Strong Secrets
```bash
# Generate JWT secret
openssl rand -base64 32

# Generate API token salt
openssl rand -base64 32

# Generate app keys (comma-separated)
openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n' && echo ',' && openssl rand -base64 32 | tr -d '\n'
```

### Update .env with Secure Values
```env
# Replace placeholder values with generated secrets
JWT_SECRET=your-generated-jwt-secret
API_TOKEN_SALT=your-generated-api-token-salt
APP_KEYS=key1,key2,key3,key4
ADMIN_JWT_SECRET=your-generated-admin-jwt-secret
```

## 2. Rate Limiting

### Install Rate Limit Middleware
```bash
cd strapi
npm install strapi-plugin-rate-limit
```

### Configure Rate Limiting
Create `config/plugins.js`:
```javascript
module.exports = {
  'rate-limit': {
    enabled: true,
    config: {
      interval: 60000, // 1 minute
      max: 100, // Max 100 requests per minute
      onLimitReached: (ctx) => {
        ctx.status = 429;
        ctx.body = {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.'
        };
      }
    }
  }
};
```

## 3. Content Security Policy (CSP)

Update `config/security.js`:
```javascript
module.exports = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'connect-src': ["'self'", 'https:'],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'dl.airtable.com',
        'your-domain.com',
        'res.cloudinary.com' // If using Cloudinary
      ],
      'media-src': [
        "'self'",
        'data:',
        'blob:',
        'dl.airtable.com',
        'your-domain.com',
        'res.cloudinary.com' // If using Cloudinary
      ],
      'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      'font-src': ["'self'", 'fonts.gstatic.com'],
      upgradeInsecureRequests: null,
    },
  },
};
```

## 4. Database Security

### Use Production Database
Replace SQLite with PostgreSQL or MySQL:
```env
# PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

### Secure Database Connection
1. Use dedicated database user with minimal privileges
2. Enable SSL for database connections
3. Regular backups with encryption

## 5. API Security

### Disable Unnecessary Endpoints
In `config/api.js`:
```javascript
module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};
```

### Secure Admin Panel
In `config/admin.js`:
```javascript
module.exports = {
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: false, // Disable NPS survey
  },
};
```

## 6. File Upload Security

### Validate File Types
In media library settings or custom upload plugin:
```javascript
// Allowed file types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/quicktime'
];

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024;
```

## 7. Monitoring and Logging

### Enable Audit Logs
Install audit logs plugin:
```bash
npm install strapi-plugin-audit-log
```

### Configure Logging
In `config/logger.js`:
```javascript
module.exports = {
  level: 'info',
  exposeInContext: true,
  requests: true,
};
```

## 8. Regular Security Updates

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update Strapi
npm update @strapi/strapi

# Update plugins
npm update strapi-plugin-*
```

### Security Scanning
```bash
# Install security audit tool
npm install -g nsp

# Scan for vulnerabilities
nsp check
```

## 9. Backup Strategy

### Automated Backups
Create backup script:
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
STRAPIDB="strapi_db_backup_$DATE.sql"

# Database backup
pg_dump -U strapi_user -h localhost strapi_db > $BACKUP_DIR/$STRAPIDB

# File backup
tar -czf $BACKUP_DIR/strapi_files_$DATE.tar.gz /path/to/strapi/public/uploads

# Encrypt backups
gpg --cipher-algo AES256 --symmetric --batch --passphrase-file /path/to/passphrase.txt $BACKUP_DIR/$STRAPIDB
gpg --cipher-algo AES256 --symmetric --batch --passphrase-file /path/to/passphrase.txt $BACKUP_DIR/strapi_files_$DATE.tar.gz

# Remove unencrypted files
rm $BACKUP_DIR/$STRAPIDB
rm $BACKUP_DIR/strapi_files_$DATE.tar.gz
```

## 10. Firewall Configuration

### UFW (Uncomplicated Firewall)
```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Allow Strapi admin (restrict to your IP)
sudo ufw allow from YOUR_IP_ADDRESS to any port 1337

# Check status
sudo ufw status
```

## Security Checklist

- [ ] Generate and secure all environment secrets
- [ ] Implement rate limiting
- [ ] Configure Content Security Policy
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Secure database connection with SSL
- [ ] Validate file uploads
- [ ] Enable audit logging
- [ ] Set up automated security updates
- [ ] Implement backup strategy
- [ ] Configure firewall
- [ ] Disable unnecessary endpoints
- [ ] Secure admin panel access
- [ ] Regular security scanning