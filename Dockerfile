FROM node:lts-slim

# Install necessary packages for development
RUN apt-get update && apt-get install -y \
    curl \
    procps \
    htop \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Creating .env file
# RUN mv .env.example .env

# Install dependencies
RUN npm install

# Create non-root user for security (optional for development)
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs


# Expose port
EXPOSE 3000

# Command to run the application (development mode)
CMD ["npm", "run", "start:dev"]