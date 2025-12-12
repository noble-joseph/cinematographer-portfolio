#!/bin/bash

# Health check script for Cinematographer Portfolio

# Check if required services are running
SERVICES=("nginx" "strapi")

echo "🏥 Health Check for Cinematographer Portfolio"
echo "=========================================="

# Check Nginx
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx: Running"
else
    echo "❌ Nginx: Not running"
    # Try to start nginx
    sudo systemctl start nginx
fi

# Check Strapi via PM2
if pm2 list | grep -q "cinematographer-portfolio-api"; then
    STATUS=$(pm2 list | grep "cinematographer-portfolio-api" | awk '{print $10}')
    if [ "$STATUS" == "online" ]; then
        echo "✅ Strapi: Running"
    else
        echo "❌ Strapi: Not running (Status: $STATUS)"
        # Try to restart Strapi
        pm2 restart cinematographer-portfolio-api
    fi
else
    echo "❌ Strapi: Not found in PM2"
fi

# Check API endpoints
echo "\n🌐 API Endpoint Checks:"
echo "======================"

# Check main website
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://your-portfolio-domain.com)
if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Website: OK (200)"
else
    echo "❌ Website: Error ($HTTP_CODE)"
fi

# Check Strapi API
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://api.your-portfolio-domain.com/_health)
if [ "$API_CODE" == "204" ]; then
    echo "✅ Strapi API: OK (204)"
else
    echo "❌ Strapi API: Error ($API_CODE)"
fi

# Check projects endpoint
PROJECTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://api.your-portfolio-domain.com/api/projects)
if [ "$PROJECTS_CODE" == "200" ]; then
    echo "✅ Projects API: OK (200)"
else
    echo "❌ Projects API: Error ($PROJECTS_CODE)"
fi

echo "\n📈 System Resources:"
echo "==================="

# Disk usage
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}')
echo "💾 Disk Usage: $DISK_USAGE"

# Memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f%%", $3*100/$2}')
echo "🧠 Memory Usage: $MEMORY_USAGE"

# CPU usage (1 minute average)
CPU_USAGE=$(uptime | awk -F'load average:' '{ print $2 }' | awk '{ print $1 }')
echo "⚡ CPU Load: $CPU_USAGE"

echo "\n✅ Health check completed"