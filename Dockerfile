FROM node:lts-slim

# Set working directory
WORKDIR /app

# Install necessary packages for development
RUN apt-get update && apt-get install -y \
    curl \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./
COPY .env.example ./

RUN mv .env.example .env

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create non-root user for security (optional for development)
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Command to run the application (development mode)
CMD ["npm", "run", "start:dev", "-L"]