#!/bin/bash

# Deployment Script for Cinematographer Portfolio

echo "🚀 Starting deployment process..."

# 1. Build React frontend
echo "🏗️  Building React frontend..."
cd client
npm run build
cd ..

# 2. Copy build to deployment directory
echo "📦 Copying build files..."
cp -r client/build/* /var/www/portfolio/

# 3. Pull latest Strapi code
echo "🔄 Updating Strapi..."
cd strapi
git pull origin main

# 4. Install/update dependencies
echo "📥 Installing dependencies..."
npm install

# 5. Restart Strapi with PM2
echo "♻️  Restarting Strapi..."
pm2 restart cinematographer-portfolio-api

# 6. Reload Nginx
echo "🔁 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
echo "🌍 Visit your site at https://your-portfolio-domain.com"