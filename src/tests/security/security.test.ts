import { test, expect } from '@playwright/test';
import axios from 'axios';

const ZAP_API_URL = process.env.ZAP_API_URL || 'http://localhost:8080';
const ZAP_API_KEY = process.env.ZAP_API_KEY || '';

test.describe('Security Tests', () => {
    test('should not have critical vulnerabilities', async () => {
        // Start a new ZAP session
        await axios.get(`${ZAP_API_URL}/JSON/core/action/newSession/`, {
            params: { apikey: ZAP_API_KEY }
        });

        // Spider the target URL
        const targetUrl = process.env.DEPLOY_URL || 'http://localhost:3000';
        const spiderResponse = await axios.get(`${ZAP_API_URL}/JSON/spider/action/scan/`, {
            params: {
                apikey: ZAP_API_KEY,
                url: targetUrl,
                maxChildren: '10'
            }
        });

        // Wait for spider to complete
        const spiderId = spiderResponse.data.scan;
        let spiderProgress = 0;
        while (spiderProgress < 100) {
            const statusResponse = await axios.get(`${ZAP_API_URL}/JSON/spider/view/status/`, {
                params: {
                    apikey: ZAP_API_KEY,
                    scanId: spiderId
                }
            });
            spiderProgress = parseInt(statusResponse.data.status);
            if (spiderProgress < 100) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Run active scan
        const scanResponse = await axios.get(`${ZAP_API_URL}/JSON/ascan/action/scan/`, {
            params: {
                apikey: ZAP_API_KEY,
                url: targetUrl,
                recurse: true,
                inScopeOnly: true
            }
        });

        // Wait for scan to complete
        const scanId = scanResponse.data.scan;
        let scanProgress = 0;
        while (scanProgress < 100) {
            const statusResponse = await axios.get(`${ZAP_API_URL}/JSON/ascan/view/status/`, {
                params: {
                    apikey: ZAP_API_KEY,
                    scanId: scanId
                }
            });
            scanProgress = parseInt(statusResponse.data.status);
            if (scanProgress < 100) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Get alerts
        const alertsResponse = await axios.get(`${ZAP_API_URL}/JSON/core/view/alerts/`, {
            params: {
                apikey: ZAP_API_KEY,
                baseurl: targetUrl,
                start: 0,
                count: 100
            }
        });

        const criticalAlerts = alertsResponse.data.alerts.filter(
            (alert: any) => alert.risk === 'High' || alert.risk === 'Critical'
        );

        expect(criticalAlerts.length).toBe(0, 
            `Found ${criticalAlerts.length} critical security issues:\n${JSON.stringify(criticalAlerts, null, 2)}`
        );
    });

    test('security headers are properly configured', async ({ page }) => {
        const response = await page.goto('/');
        const headers = response?.headers();
        
        expect(headers?.['x-frame-options']).toBeTruthy();
        expect(headers?.['x-content-type-options']).toBe('nosniff');
        expect(headers?.['strict-transport-security']).toBeTruthy();
        expect(headers?.['content-security-policy']).toBeTruthy();
    });

    test('authentication endpoints are secure', async ({ request }) => {
        const response = await request.post('/api/auth/login', {
            data: {
                username: 'test',
                password: 'test'
            }
        });

        expect(response.headers()['content-type']).toContain('application/json');
        expect(response.status()).not.toBe(500);
        
        const data = await response.json();
        expect(data.error).toBeTruthy();
        expect(data.error).toContain('Invalid credentials');
    });
});
