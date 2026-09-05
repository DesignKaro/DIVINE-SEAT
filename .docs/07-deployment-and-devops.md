# 07. Deployment & DevOps Guide

## 1. Hosting Environment
- **Provider**: Hostinger VPS
- **Server IP**: `187.77.187.159`
- **Application Path**: `/var/www/divine-lotus`
- **Port**: `3001` (Internal Node.js PM2 process)
- **Public Domain**: `https://thedivinelotus.org`

---

## 2. Process Management (PM2)

Next.js runs under PM2 in cluster/fork mode to ensure zero-downtime reloads and automatic restarts on crash or reboot.

### `ecosystem.config.cjs`
```javascript
module.exports = {
  apps: [
    {
      name: "divine-lotus",
      script: "npm",
      args: "start -- -p 3001",
      cwd: "/var/www/divine-lotus",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
```

### Useful PM2 Commands on VPS
```bash
pm2 list                       # Check process status and uptime
pm2 logs divine-lotus          # Stream real-time logs
pm2 reload divine-lotus        # Graceful zero-downtime reload
pm2 restart divine-lotus       # Full restart
pm2 monit                      # CPU / RAM resource monitoring
```

---

## 3. Nginx Reverse Proxy Configuration

Nginx listens on ports 80 and 443 with Let's Encrypt SSL and proxies traffic to the local Next.js server:

```nginx
server {
    server_name thedivinelotus.org www.thedivinelotus.org;

    # Gzip & Brotli compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static caching for immutable chunks
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3001;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/thedivinelotus.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thedivinelotus.org/privkey.pem;
}

server {
    listen 80;
    server_name thedivinelotus.org www.thedivinelotus.org;
    return 301 https://$host$request_uri;
}
```

---

## 4. One-Line Production Deployment Workflow

Whenever changes are pushed to GitHub `main` branch, update the live production website with a single command:

```bash
cd /var/www/divine-lotus && git pull origin main && npm run build && pm2 reload divine-lotus
```

### Deployment Step Breakdown
1. `cd /var/www/divine-lotus`: Navigates to the active production project directory.
2. `git pull origin main`: Fetches the latest commits from GitHub.
3. `npm run build`: Compiles production pages and optimizes static chunks using Turbopack.
4. `pm2 reload divine-lotus`: Triggers a graceful reload of the Node server with zero dropped connections.

---

## 5. Rollback Procedure
If a regression occurs:
```bash
cd /var/www/divine-lotus
git log -n 5 --oneline          # Identify the desired previous commit hash
git checkout <previous_commit_hash>
npm run build
pm2 reload divine-lotus
```
