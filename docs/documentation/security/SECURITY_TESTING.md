# Security Testing Guide

## Overview
This document outlines the security testing framework and procedures for the portfolio website.

## Security Testing Framework

### 1. OWASP ZAP Integration
- **Configuration**: `/src/tests/security/zap.config.ts`
- **Location**: `/src/tests/security/`
- **Purpose**: Automated security scanning and vulnerability detection
- **Features**:
  - Active scanning for vulnerabilities
  - Passive scanning for potential issues
  - API security testing
  - Authentication testing
  - CSRF/XSS detection

### 2. Security Test Categories

#### Authentication Tests
- Test user authentication flows
- Verify token handling
- Check session management
- Test password policies
- Validate 2FA implementation

#### Authorization Tests
- Test role-based access control
- Verify API endpoint permissions
- Check resource access controls
- Test boundary conditions

#### Input Validation Tests
- Test for XSS vulnerabilities
- Check SQL injection protection
- Validate file upload security
- Test for command injection

#### API Security Tests
- Test API authentication
- Verify rate limiting
- Check request validation
- Test error handling
- Validate CORS configuration

#### Configuration Tests
- Verify security headers
- Check SSL/TLS configuration
- Test CSP implementation
- Validate cookie settings

### 3. Security Test Implementation

#### Test Structure
```typescript
test.describe('Security Tests', () => {
    test('should not have critical vulnerabilities', async () => {
        // ZAP API integration
        // Spider scan
        // Active scan
        // Vulnerability assessment
    });

    test('security headers are properly configured', async ({ page }) => {
        // Security headers validation
        // CSP, HSTS, X-Frame-Options, etc.
    });

    test('authentication endpoints are secure', async ({ request }) => {
        // Authentication security
        // Input validation
        // Error handling
    });
});
```

### 4. Continuous Security Testing

#### GitHub Actions Integration
```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Install dependencies
      run: npm install
    - name: Start ZAP
      run: docker run -d --name zap -p 8080:8080 owasp/zap2docker-stable zap.sh -daemon -port 8080 -host 0.0.0.0 -config api.disablekey=true
    - name: Run security tests
      run: npm run test:security
```

### 5. Security Test Reports

#### Report Format
```json
{
  "timestamp": "2024-01-09T12:00:00Z",
  "version": "0.25.50",
  "results": {
    "critical": [],
    "high": [],
    "medium": [],
    "low": [],
    "info": []
  }
}
```

## Running Security Tests

### Prerequisites
- OWASP ZAP running locally or in Docker
- Environment variables configured:
  - `ZAP_API_URL`: ZAP API endpoint (default: http://localhost:8080)
  - `ZAP_API_KEY`: Optional API key for ZAP authentication

### Local Development
```bash
# Start ZAP (using Docker)
docker run -d --name zap -p 8080:8080 owasp/zap2docker-stable zap.sh -daemon -port 8080 -host 0.0.0.0 -config api.disablekey=true

# Run all security tests
npm run test:security

# Run specific test categories
npm run test:security:auth
npm run test:security:api
npm run test:security:headers

# Generate security report
npm run test:security:report
```

## Security Test Thresholds

### Acceptance Criteria
- No high-severity findings
- Maximum of 2 medium-severity findings
- Must fix all critical vulnerabilities
- 95% security test coverage

### Performance Impact
- Security tests should complete within 5 minutes
- Maximum 10% performance impact
- Rate limiting tests must be isolated
