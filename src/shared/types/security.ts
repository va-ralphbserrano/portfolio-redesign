export interface SecurityConfig {
  jwtSecret: string;
  tokenExpiration: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  requireMFA: boolean;
  allowedOrigins: string[];
  rateLimits: {
    [key: string]: {
      windowMs: number;
      maxRequests: number;
    };
  };
  EMAIL_SERVICE_ID: string;
  EMAIL_TEMPLATE_ID: string;
  EMAIL_USER_ID: string;
  GA_TRACKING_ID: string;
  API_KEY: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
}

export interface UserCredentials {
  username: string;
  password: string;
  mfaCode?: string;
}

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

export interface JWTConfig {
  secret: string;
  expiration: number;
}
