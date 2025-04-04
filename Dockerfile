# frontend/Dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Serve using a simple server like serve
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
