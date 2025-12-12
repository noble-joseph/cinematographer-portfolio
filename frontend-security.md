# Frontend Security Implementation Guide

## 1. Content Security Policy (CSP)

### HTML Meta Tags
Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src 'self' fonts.gstatic.com; 
               img-src 'self' data: blob: dl.airtable.com your-domain.com; 
               connect-src 'self' your-api-domain.com; 
               media-src 'self' data: blob: dl.airtable.com your-domain.com;">
```

### Report Violations
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               report-uri /csp-violation-report-endpoint">
```

## 2. XSS Protection

### Sanitize User Inputs
Install DOMPurify:
```bash
npm install dompurify
```

Usage in components:
```javascript
import DOMPurify from 'dompurify';

function sanitizeHTML(html) {
  return DOMPurify.sanitize(html);
}

// In your component
const cleanContent = sanitizeHTML(userInput);
```

### Validate API Responses
```javascript
// Validate data before rendering
function validateProjectData(project) {
  if (!project || typeof project !== 'object') return null;
  
  return {
    id: typeof project.id === 'number' ? project.id : null,
    title: typeof project.title === 'string' ? project.title : '',
    description: typeof project.description === 'string' ? project.description : '',
    // ... validate other fields
  };
}
```

## 3. CSRF Protection

### SameSite Cookies
If using cookies for authentication:
```javascript
// Set cookies with SameSite attribute
document.cookie = "token=value; SameSite=Strict; Secure";
```

## 4. Secure Headers

### Helmet.js for Express Server
If serving React build with Express:
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'your-domain.com'],
      scriptSrc: ["'self'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  xssFilter: true,
  noSniff: true,
}));
```

## 5. Environment Variables Security

### Client-Side Variables
Only expose non-sensitive variables:
```env
# Safe to expose (public)
REACT_APP_STRAPI_URL=https://api.your-domain.com
REACT_APP_SITE_NAME=Your Portfolio

# NEVER expose these:
# DATABASE_PASSWORD
# API_SECRET_KEYS
# ADMIN_CREDENTIALS
```

### Server-Side Variables (.env.local)
Store sensitive variables in `.env.local` (never committed to git):
```env
# .env.local - NOT COMMITTED TO GIT
REACT_APP_ANALYTICS_ID=GA-XXXXXXXXX
REACT_APP_API_KEY=secret-api-key
```

## 6. Form Validation and Sanitization

### Client-Side Validation
```javascript
// Contact form validation
function validateContactForm(data) {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

## 7. Dependency Security

### Audit Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### Lockfile Security
Commit `package-lock.json` to ensure consistent dependency versions:
```bash
git add package-lock.json
git commit -m "Lock dependency versions"
```

## 8. Build Security

### Minify and Obfuscate
Create React App automatically:
- Minifies JavaScript and CSS
- Removes development-only code
- Optimizes assets

### Environment-Based Builds
```json
{
  "scripts": {
    "build:prod": "env NODE_ENV=production npm run build",
    "build:staging": "env NODE_ENV=staging npm run build"
  }
}
```

## 9. Error Handling

### Avoid Exposing Sensitive Information
```javascript
// Bad - exposes stack trace
catch (error) {
  console.error(error.stack);
  alert(error.message);
}

// Good - generic error message
catch (error) {
  console.error('An error occurred'); // Log for developers
  setError('Something went wrong. Please try again.'); // User-friendly message
}
```

## 10. Secure Deployment

### Static Asset Security
```javascript
// Serve static files with security headers
app.use('/static', express.static(path.join(__dirname, 'build/static'), {
  maxAge: '1y',
  etag: false,
  setHeaders: (res, path) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));
```

## 11. Third-Party Library Security

### Vet Third-Party Libraries
1. Check npm downloads and GitHub stars
2. Review recent commits and issues
3. Check for security advisories
4. Use Snyk or similar tools for continuous monitoring

### Content Delivery Networks (CDNs)
If using CDNs:
```html
<!-- Subresource Integrity -->
<script src="https://cdn.jsdelivr.net/npm/library@1.0.0/dist/library.min.js"
        integrity="sha384-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        crossorigin="anonymous"></script>
```

## 12. Monitoring and Reporting

### Error Tracking
```javascript
// Report CSP violations
app.post('/csp-violation-report-endpoint', (req, res) => {
  if (req.body) {
    console.log('CSP Violation:', req.body);
  }
  res.status(204).send();
});
```

### Security Headers Testing
Test your headers with:
- https://securityheaders.com/
- https://observatory.mozilla.org/

## Security Checklist

- [ ] Implement Content Security Policy
- [ ] Sanitize all user inputs and API responses
- [ ] Validate forms and API data
- [ ] Audit and update dependencies regularly
- [ ] Use secure environment variables
- [ ] Implement proper error handling
- [ ] Configure secure HTTP headers
- [ ] Test with security scanning tools
- [ ] Monitor for vulnerabilities
- [ ] Implement reporting mechanisms
- [ ] Secure third-party integrations
- [ ] Validate deployment configurations