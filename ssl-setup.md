# SSL Setup Guide

## Let's Encrypt Setup

### 1. Install Certbot
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --nginx -d your-portfolio-domain.com -d www.your-portfolio-domain.com
```

### 3. Test Automatic Renewal
```bash
sudo certbot renew --dry-run
```

### 4. Set Up Auto-Renewal
```bash
sudo crontab -e
# Add this line to run twice daily:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Manual SSL Certificate Installation

### 1. Upload Certificate Files
Place your certificate files in:
```
/etc/ssl/certs/your-certificate.crt
/etc/ssl/private/your-private.key
```

### 2. Update Nginx Configuration
Modify the paths in nginx.conf:
```nginx
ssl_certificate /etc/ssl/certs/your-certificate.crt;
ssl_certificate_key /etc/ssl/private/your-private.key;
```

### 3. Test Configuration
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Verification

### Test SSL Configuration
Visit these sites to verify your SSL setup:
- https://www.ssllabs.com/ssltest/
- https://securityheaders.com/
- https://observatory.mozilla.org/

### Expected Results
- ✅ A+ SSL Labs Rating
- ✅ Perfect Forward Secrecy
- ✅ HTTP/2 Enabled
- ✅ Security Headers Present