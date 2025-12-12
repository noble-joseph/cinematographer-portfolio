# Cron Job Setup for Automated Monitoring

## Health Check Schedule

Add this to your crontab:
```bash
# Edit crontab
crontab -e

# Add these lines:
# Run health check every 15 minutes
*/15 * * * * /path/to/health-check.sh >> /var/log/portfolio-health.log 2>&1

# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/portfolio-backup.log 2>&1

# Weekly security scan on Sunday at 3 AM
0 3 * * 0 /usr/bin/nsp check >> /var/log/portfolio-security.log 2>&1

# Monthly log rotation
0 0 1 * * /usr/sbin/logrotate /etc/logrotate.conf >> /var/log/logrotate.log 2>&1
```

## Alerting System

### Email Alerts
Create an alert script:
```bash
#!/bin/bash
# alert.sh

EMAIL="admin@your-domain.com"
SUBJECT="Portfolio Alert: $1"

echo "$2" | mail -s "$SUBJECT" "$EMAIL"
```

### Slack Notifications
```bash
#!/bin/bash
# slack-alert.sh

WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
MESSAGE="$1"

curl -X POST -H 'Content-type: application/json' \
  --data "{\"text\":\"$MESSAGE\"}" \
  $WEBHOOK_URL
```

## Monitoring Services

### Uptime Monitoring
Consider these services for external monitoring:
1. **UptimeRobot** - Free tier available
2. **Pingdom** - Comprehensive monitoring
3. **StatusCake** - Advanced alerting

### Setup UptimeRobot
1. Sign up at https://uptimerobot.com
2. Add HTTP(s) monitor for:
   - https://your-portfolio-domain.com
   - https://api.your-portfolio-domain.com/_health
3. Set check interval to 5 minutes
4. Configure alert contacts

### Performance Monitoring
1. **Google PageSpeed Insights** - Performance metrics
2. **GTmetrix** - Detailed performance analysis
3. **WebPageTest** - Global performance testing

## Log Analysis

### Install Log Analysis Tools
```bash
# Install GoAccess for nginx log analysis
sudo apt-get install goaccess

# Analyze logs
goaccess /var/log/nginx/access.log -o /var/www/html/report.html --log-format=COMBINED
```

### Set Up Log Analysis Reports
```bash
# Daily report generation
0 1 * * * goaccess /var/log/nginx/access.log -o /var/www/html/daily-report.html --log-format=COMBINED

# Weekly report
0 2 * * 1 goaccess /var/log/nginx/access.log -o /var/www/html/weekly-report.html --log-format=COMBINED
```

## Monitoring Dashboard

### Create a Simple Dashboard
```html
<!DOCTYPE html>
<html>
<head>
    <title>Portfolio Monitoring Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .status-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .status-up { background-color: #d4edda; border-color: #c3e6cb; }
        .status-down { background-color: #f8d7da; border-color: #f5c6cb; }
        .metric { font-size: 24px; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Portfolio Monitoring Dashboard</h1>
    
    <div class="status-card status-up">
        <h2>Website Status</h2>
        <div class="metric">✅ UP</div>
        <p>Last checked: <span id="last-check"></span></p>
    </div>
    
    <div class="status-card status-up">
        <h2>API Status</h2>
        <div class="metric">✅ UP</div>
        <p>Response time: 45ms</p>
    </div>
    
    <div class="status-card">
        <h2>Traffic Stats</h2>
        <p>Today's visitors: 1,243</p>
        <p>Page views: 3,456</p>
    </div>
    
    <script>
        document.getElementById('last-check').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
```

## Monitoring Checklist

- [ ] Set up health check cron job
- [ ] Configure email/SMS alerts
- [ ] Set up external uptime monitoring
- [ ] Implement log rotation
- [ ] Create monitoring dashboard
- [ ] Set up performance monitoring
- [ ] Configure security scanning
- [ ] Implement backup verification
- [ ] Set up resource monitoring
- [ ] Configure alert escalation