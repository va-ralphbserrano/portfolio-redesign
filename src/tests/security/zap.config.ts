import { ZapClient, ZapConfigType } from '@zaproxy/core';

const config: ZapConfigType = {
    // ZAP API Configuration
    apiKey: process.env.ZAP_API_KEY || '',
    proxy: {
        host: 'localhost',
        port: 8080,
    },

    // Target Configuration
    target: {
        url: process.env.NODE_ENV === 'production'
            ? 'https://va-ralphbserrano.github.io/va-rb-portfolio/'
            : 'http://localhost:3000',
        contextName: 'Portfolio',
    },

    // Scan Configuration
    scan: {
        maxDuration: 300, // 5 minutes
        maxDepth: 5,
        maxChildren: 10,
        recurse: true,
        inScopeOnly: true,
    },

    // Authentication Configuration
    authentication: {
        method: 'form',
        loginUrl: '/api/auth/login',
        loginRequestData: 'username={%username%}&password={%password%}',
        loggedInRegex: '\\QWelcome\\E',
        loggedOutRegex: '\\QLogin\\E',
    },

    // Session Management
    session: {
        type: 'cookie',
        parameters: ['session', 'token'],
    },

    // Alert Filters
    alertFilters: [
        {
            ruleId: 10020,  // X-Frame-Options Header
            newLevel: -1,   // False Positive
        },
        {
            ruleId: 10021,  // X-Content-Type-Options Header
            newLevel: 1,    // Low
        },
    ],

    // Reporting Configuration
    reports: {
        template: 'traditional-html',
        dir: './security-reports',
        fileName: 'security-report.html',
    },

    // Rules Configuration
    rules: {
        enableTags: ['OWASP_2021_A01', 'OWASP_2021_A02', 'OWASP_2021_A03'],
        disableRules: [],
        ruleConfigs: {
            // Authentication
            '10202': { threshold: 'medium' },  // Password policy
            '10105': { threshold: 'high' },    // Weak auth

            // Injection
            '40012': { threshold: 'high' },    // SQL injection
            '40014': { threshold: 'high' },    // XSS
            '40018': { threshold: 'medium' },  // Command injection

            // Configuration
            '10035': { threshold: 'medium' },  // Strict-Transport-Security
            '10038': { threshold: 'low' },     // Content Security Policy
            10202: {},
            10105: {},
            40012: {},
            40014: {},
            40018: {},
            10035: {},
            10038: {}
        },
    },
};

export default config;
