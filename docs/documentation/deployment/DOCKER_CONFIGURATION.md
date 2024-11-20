# Docker Configuration Documentation

## Overview
This document details the Docker configuration for the portfolio website project, including development, testing, and production environments.

## Directory Structure
```
portfolio-redesign/
├── docker/
│   ├── development/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── testing/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   └── production/
│       ├── Dockerfile
│       └── docker-compose.yml
├── .dockerignore
└── docker-compose.yml
```

## Base Configuration

### .dockerignore
```plaintext
node_modules/
coverage/
.git/
*.log
.env
.env.*
dist/
build/
.DS_Store
```

### Development Environment

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/development/Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

### Production Environment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/production/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Security Considerations

1. **Image Security**
   - Use official Node.js Alpine images
   - Regular security updates
   - Minimal base image
   - No unnecessary packages

2. **Runtime Security**
   - Non-root user execution
   - Read-only filesystem where possible
   - Environment variable management
   - Health checks implementation

3. **Network Security**
   - Internal network isolation
   - Port exposure control
   - TLS/SSL configuration
   - Rate limiting implementation

## Security Best Practices

### Container Security
1. Use official base images only
2. Run containers as non-root user
3. Implement least privilege principle
4. Regular security updates
5. Resource limits configuration
6. Image vulnerability scanning

### Environment Configuration
```dockerfile
# Security-focused configuration
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Resource limits
MEMORY_LIMIT=512m
CPU_LIMIT=0.5
```

## Testing Environment

### Dockerfile.test
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and test files
COPY . .

# Set permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Run tests
CMD ["npm", "run", "test"]
```

### Test Environment Variables
```plaintext
NODE_ENV=test
VITE_API_URL=http://localhost:3000
VITE_MOCK_DATA=true
```

### Testing Workflow
1. Build test container
2. Run unit tests
3. Run integration tests
4. Generate coverage report
5. Verify performance benchmarks
6. Security scan results

## Performance Optimizations

1. **Build Optimization**
   - Multi-stage builds
   - Layer caching
   - Optimized dependency installation
   - Minimized image size

2. **Runtime Optimization**
   - Node.js production mode
   - Resource constraints
   - Volume mounting strategy
   - Efficient caching

## Monitoring & Logging

1. **Container Monitoring**
   - Health check endpoints
   - Resource usage tracking
   - Performance metrics
   - Error logging

2. **Log Management**
   - Structured logging
   - Log rotation
   - Volume mounting for logs
   - Log aggregation

## Development Workflow

### Starting Development Environment
```bash
# Build and start containers
docker-compose -f docker/development/docker-compose.yml up -d

# View logs
docker-compose -f docker/development/docker-compose.yml logs -f

# Stop containers
docker-compose -f docker/development/docker-compose.yml down
```

### Running Tests
```bash
# Run test suite in container
docker-compose -f docker/testing/docker-compose.yml run --rm app npm test

# Generate coverage report
docker-compose -f docker/testing/docker-compose.yml run --rm app npm run test:coverage
```

### Production Deployment
```bash
# Build production image
docker-compose -f docker/production/docker-compose.yml build

# Start production containers
docker-compose -f docker/production/docker-compose.yml up -d

# Monitor production logs
docker-compose -f docker/production/docker-compose.yml logs -f
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify package.json dependencies
   - Review build scripts
   - Check available system resources

2. **Runtime Errors**
   - Check environment variables
   - Verify port availability
   - Review volume mounts
   - Check container logs

3. **Performance Issues**
   - Monitor resource usage
   - Review container limits
   - Check network configuration
   - Analyze application metrics

## Best Practices

1. **Development**
   - Use volume mounts for hot reloading
   - Implement proper caching
   - Maintain separate environments
   - Follow security guidelines

2. **Testing**
   - Automated test runs
   - Consistent test environment
   - Coverage reporting
   - Integration testing

3. **Production**
   - Regular security updates
   - Resource monitoring
   - Backup strategy
   - Rollback procedures

## Related Documentation
- [Deployment Guide](./DEPLOYMENT.md)
- [Security Guide](../security/SECURITY.md)
- [Performance Guide](../technical/PERFORMANCE_OPTIMIZATION.md)
- [Monitoring Guide](../technical/MONITORING.md)
