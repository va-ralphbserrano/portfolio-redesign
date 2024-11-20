FROM node:18-alpine

WORKDIR /app

# Add non-root user for security (Rule 2)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and test files
COPY . .

# Set correct permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user (Security requirement)
USER appuser

# Set environment variables
ENV NODE_ENV=test
ENV VITE_MOCK_DATA=true

# Run tests with coverage
CMD ["npm", "run", "test:coverage"]
