# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





# frontend/Dockerfile
#FROM node:18
#
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#
#RUN npm run build
#
## Serve using a simple server like serve
#RUN npm install -g serve
#EXPOSE 3000
#CMD ["serve", "-s", "build"]
