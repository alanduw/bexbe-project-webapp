FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Build the React app
RUN npm run build2

# Install lightweight static server
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Start app
CMD ["serve", "-s", "dist", "-l", "8080"]

