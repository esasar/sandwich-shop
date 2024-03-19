# Base image from the official Node.js image on Docker Hub
FROM node:21-alpine AS build

# Create app directory
WORKDIR /app

# Copy dependency definitions
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy code needed to run the app to the container
COPY . .

# Create production build of app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Serve the app
CMD ["npm", "run", "preview"]