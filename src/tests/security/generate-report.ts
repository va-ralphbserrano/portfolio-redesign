import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const ZAP_API_URL = process.env.ZAP_API_URL || 'http://localhost:8080';
const ZAP_API_KEY = process.env.ZAP_API_KEY || '';
const REPORT_DIR = path.join(process.cwd(), 'reports', 'security');

async function generateReport(): void {
    try {
        // Create reports directory if it doesn't exist
        await fs.mkdir(REPORT_DIR, { recursive: true });

        // Get alerts from ZAP
        const alertsResponse = await axios.get(`${ZAP_API_URL}/JSON/core/view/alerts/`, {
            params: {
                apikey: ZAP_API_KEY,
                baseurl: process.env.DEPLOY_URL || 'http://localhost:3000',
                start: 0,
                count: 100
            }
        });

        // Get scan status
        const scanStatusResponse = await axios.get(`${ZAP_API_URL}/JSON/ascan/view/status/`, {
            params: {
                apikey: ZAP_API_KEY
            }
        });

        // Categorize alerts by severity
        const alerts = alertsResponse.data.alerts;
        const categorizedAlerts = {
            critical: alerts.filter(alert => alert.risk === 'Critical'),
            high: alerts.filter(alert => alert.risk === 'High'),
            medium: alerts.filter(alert => alert.risk === 'Medium'),
            low: alerts.filter(alert => alert.risk === 'Low'),
            info: alerts.filter(alert => alert.risk === 'Informational')
        };

        // Generate report
        const report = {
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || '0.25.50',
            scanStatus: {
                status: scanStatusResponse.data.status,
                progress: scanStatusResponse.data.progress
            },
            summary: {
                total: alerts.length,
                critical: categorizedAlerts.critical.length,
                high: categorizedAlerts.high.length,
                medium: categorizedAlerts.medium.length,
                low: categorizedAlerts.low.length,
                info: categorizedAlerts.info.length
            },
            results: categorizedAlerts,
            thresholds: {
                passed: categorizedAlerts.critical.length === 0 && categorizedAlerts.high.length <= 2,
                criteria: {
                    critical: 'No critical findings allowed',
                    high: 'Maximum of 2 high-severity findings'
                }
            }
        };

        // Save report
        const reportPath = path.join(REPORT_DIR, `security-report-${new Date().toISOString().split('T')[0]}.json`);
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

        console.log(`Security report generated: ${reportPath}`);
        console.log('\nSummary:');
        console.log(`- Critical: ${report.summary.critical}`);
        console.log(`- High: ${report.summary.high}`);
        console.log(`- Medium: ${report.summary.medium}`);
        console.log(`- Low: ${report.summary.low}`);
        console.log(`- Info: ${report.summary.info}`);
        console.log(`\nThresholds ${report.thresholds.passed ? 'PASSED' : 'FAILED'}`);

        if (!report.thresholds.passed) {
            process.exit(1);
        }
    } catch (error) {
        console.error('Error generating security report:', error.message);
        process.exit(1);
    }
}

generateReport();
