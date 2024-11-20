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
