FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

# Default environment
ENV NODE_ENV=production

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "src/server.js"]
