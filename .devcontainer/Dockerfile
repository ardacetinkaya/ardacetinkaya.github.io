# Use the latest available Node.js image (Node.js 24)
FROM mcr.microsoft.com/devcontainers/javascript-node:24-bullseye

# Install additional tools that might be needed for React development
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace

# Install global npm packages that are commonly used in React development
RUN npm install -g npm@latest

# Switch to the node user
USER node