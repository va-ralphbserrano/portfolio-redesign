import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Following Rule 2: Quality Assurance Protocol
describe('Test Environment Health Check', () => {
  it('should have required test directories', () => {
    const requiredDirs = [
      'src/tests/e2e',
      'src/tests/performance',
      'src/tests/security',
      'src/tests/utils',
      'src/tests/plugins'
    ];

    requiredDirs.forEach(dir => {
      expect(fs.existsSync(path.resolve(process.cwd(), dir))).toBe(true);
    });
  });

  it('should have required test configuration files', () => {
    const requiredFiles = [
      'vitest.config.ts',
      'src/tests/setup.ts',
      'src/tests/tsconfig.json',
      '.lighthouserc.json'
    ];

    requiredFiles.forEach(file => {
      expect(fs.existsSync(path.resolve(process.cwd(), file))).toBe(true);
    });
  });

  it('should have correct test coverage thresholds', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')
    );
    
    // Rule 2: Verify test coverage requirements
    expect(packageJson.scripts['test:coverage:check']).toContain('--statements 85');
    expect(packageJson.scripts['test:coverage:check']).toContain('--branches 80');
    expect(packageJson.scripts['test:coverage:check']).toContain('--functions 90');
    expect(packageJson.scripts['test:coverage:check']).toContain('--lines 85');
  });

  // Rule 3: Performance Standards verification
  it('should have correct performance thresholds', () => {
    const lighthouseConfig = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), '.lighthouserc.json'), 'utf-8')
    );
    
    const assertions = lighthouseConfig.ci.assert.assertions;
    expect(assertions['first-contentful-paint'][1].maxNumericValue).toBe(1500);
    expect(assertions['interactive'][1].maxNumericValue).toBe(2500);
    expect(assertions['largest-contentful-paint'][1].maxNumericValue).toBe(2000);
    expect(assertions['cumulative-layout-shift'][1].maxNumericValue).toBe(0.1);
  });

  it('should have required service tests', () => {
    const requiredTests = [
      'src/tests/AlertingService.test.ts',
      'src/tests/ErrorReportingService.test.ts',
      'src/tests/MonitoringDashboard.test.tsx'
    ];

    requiredTests.forEach(test => {
      expect(fs.existsSync(path.resolve(process.cwd(), test))).toBe(true);
    });
  });
});
