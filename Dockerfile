# Tahap 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json dan package-lock.json (atau yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code ke container
COPY . .

# Build React app (hasilnya di folder build)
RUN npm run build

# Tahap 2: Serve pakai Nginx
FROM nginx:stable-alpine

# Hapus default content Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build React dari tahap build ke folder Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 untuk Nginx
EXPOSE 80

# Jalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
