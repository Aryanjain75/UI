# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the root library (docs/vite.config.ts uses alias "@lib" → ../src)
# so the full project root must be present during the docs build.

# Install root library deps first (layer cache)
COPY package*.json ./
RUN npm ci

# Install docs deps
COPY docs/package*.json ./docs/
RUN cd docs && npm ci

# Copy all source (root lib src + docs src)
COPY . .

# Build the docs site → outputs to /app/docs/dist
RUN cd docs && npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:alpine

# Copy the built static site
COPY --from=builder /app/docs/dist /usr/share/nginx/html

# nginx config with SPA fallback (needed for react-router-dom)
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    location ~* \\.(?:js|css|png|jpg|svg|ico|woff2?)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]