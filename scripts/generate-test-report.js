import fs from 'fs';
import path from 'path';

function generateReport() {
  const testResultsDir = path.resolve('./test-results');
  const reportsDir = path.resolve('./reports');
  const environmentResults = JSON.parse(fs.readFileSync(path.join(testResultsDir, 'environment.json'), 'utf8'));

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: environmentResults.numTotalTests,
      passed: environmentResults.numPassedTests,
      failed: environmentResults.numFailedTests,
      skipped: environmentResults.numPendingTests,
      duration: environmentResults.duration
    },
    testSuites: environmentResults.testResults.map(suite => ({
      name: suite.name,
      status: suite.status,
      duration: suite.duration,
      tests: suite.assertionResults.map(test => ({
        title: test.title,
        status: test.status,
        duration: test.duration,
        failureMessages: test.failureMessages
      }))
    })),
    coverage: fs.existsSync('./coverage/environment/coverage-final.json')
      ? JSON.parse(fs.readFileSync('./coverage/environment/coverage-final.json', 'utf8'))
      : null
  };

  // Generate HTML report
  const htmlReport = generateHtmlReport(report);
  fs.writeFileSync(path.join(reportsDir, 'environment-report.html'), htmlReport);

  // Generate JSON report
  fs.writeFileSync(
    path.join(reportsDir, 'environment-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('Test report generated successfully!');
  console.log(`Summary: ${report.summary.passed}/${report.summary.total} tests passed`);
  
  if (report.summary.failed > 0) {
    console.error(`Failed tests: ${report.summary.failed}`);
    process.exit(1);
  }
}

function generateHtmlReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Environment Stability Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    .summary { margin-bottom: 2rem; }
    .test-suite { margin-bottom: 1rem; padding: 1rem; border: 1px solid #ccc; }
    .passed { color: green; }
    .failed { color: red; }
    .skipped { color: orange; }
    .test-case { margin-left: 2rem; }
  </style>
</head>
<body>
  <h1>Environment Stability Test Report</h1>
  <div class="summary">
    <h2>Summary</h2>
    <p>Generated: ${report.timestamp}</p>
    <p>Total Tests: ${report.summary.total}</p>
    <p class="passed">Passed: ${report.summary.passed}</p>
    <p class="failed">Failed: ${report.summary.failed}</p>
    <p class="skipped">Skipped: ${report.summary.skipped}</p>
    <p>Duration: ${report.summary.duration}ms</p>
  </div>
  
  <div class="test-suites">
    <h2>Test Suites</h2>
    ${report.testSuites.map(suite => `
      <div class="test-suite">
        <h3>${suite.name}</h3>
        <p>Status: <span class="${suite.status}">${suite.status}</span></p>
        <p>Duration: ${suite.duration}ms</p>
        
        <div class="test-cases">
          ${suite.tests.map(test => `
            <div class="test-case">
              <p>${test.title} - <span class="${test.status}">${test.status}</span></p>
              ${test.failureMessages.length ? `
                <pre class="error">${test.failureMessages.join('\n')}</pre>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

generateReport();
