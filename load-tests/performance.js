import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Ramp up to 20 users
    { duration: '3m', target: 20 }, // Stay at 20 users
    { duration: '1m', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% of requests can fail
    errors: ['rate<0.01'],            // Less than 1% error rate
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL || 'https://staging.portfolio.dev';
  
  // Homepage load
  const homeRes = http.get(BASE_URL);
  check(homeRes, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads under 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Projects page load
  const projectsRes = http.get(`${BASE_URL}/projects`);
  check(projectsRes, {
    'projects status is 200': (r) => r.status === 200,
    'projects loads under 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  
  sleep(1);
  
  // About page load
  const aboutRes = http.get(`${BASE_URL}/about`);
  check(aboutRes, {
    'about status is 200': (r) => r.status === 200,
    'about loads under 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Contact form submission
  const contactRes = http.post(`${BASE_URL}/api/contact`, {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Load test message',
  });
  check(contactRes, {
    'contact submission successful': (r) => r.status === 200,
    'contact responds under 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);
  
  sleep(2);
}
