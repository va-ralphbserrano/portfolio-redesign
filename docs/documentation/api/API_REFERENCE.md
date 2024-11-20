# API Reference

## Authentication
```typescript
interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken: string;
}

interface AuthError {
  code: string;
  message: string;
}

async function authenticate(credentials: {
  email: string;
  password: string;
}): Promise<AuthToken>

async function refreshToken(token: string): Promise<AuthToken>
```

### Authentication Headers
All authenticated endpoints require the following header:
```
Authorization: Bearer <token>
```

### Error Codes
- `AUTH_INVALID`: Invalid credentials
- `AUTH_EXPIRED`: Token expired
- `AUTH_REQUIRED`: Authentication required
- `AUTH_FORBIDDEN`: Insufficient permissions

## API Versioning
Current Version: `v1`

### Version Header
Include the version in the Accept header:
```
Accept: application/vnd.portfolio.v1+json
```

### Versioning Strategy
- URI versioning (e.g., `/api/v1/endpoint`)
- Header versioning (Accept header)
- Semantic versioning for breaking changes

## HTTP Status Codes
- `200 OK`: Request successful
- `201 Created`: Resource created
- `204 No Content`: Request successful, no content returned
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

## Core APIs

### Email Service

#### Send Email
```typescript
interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function sendEmail(data: EmailPayload): Promise<void>
```

##### Parameters
- `name`: Sender's name (required)
- `email`: Sender's email address (required)
- `subject`: Email subject line (required)
- `message`: Email body content (required)

##### Example Request
```typescript
// Send an email
const response = await sendEmail({
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "I'm interested in discussing a potential project."
});
```

##### Example Response
```typescript
// Success (200 OK)
{
  "success": true,
  "messageId": "msg_123abc",
  "timestamp": "2024-01-20T10:30:00Z"
}

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid email address format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}

// Error (429 Too Many Requests)
{
  "error": {
    "code": "RATE_LIMIT",
    "message": "Rate limit exceeded",
    "details": {
      "retryAfter": 60,
      "limit": "5 requests per minute"
    }
  }
}
```

##### Rate Limiting
- 5 requests per minute per IP
- 50 requests per hour per IP
- 500 requests per day per IP

##### Error Handling
```typescript
interface EmailError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

Error Codes:
- `RATE_LIMIT`: Rate limit exceeded
- `INVALID_INPUT`: Invalid input data
- `SERVICE_ERROR`: Email service unavailable
- `NETWORK_ERROR`: Network connectivity issues

### Media Service

#### Image Optimization
```typescript
interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  placeholder?: boolean;
}

async function optimizeImage(
  src: string | File,
  options: ImageOptimizationOptions
): Promise<OptimizedImage>
```

##### Parameters
- `src`: Image source (URL or File object)
- `options`: Optimization configuration
  - `width`: Target width in pixels
  - `height`: Target height in pixels
  - `quality`: Compression quality (0-100)
  - `format`: Output format
  - `placeholder`: Generate blur placeholder

##### Example Request
```typescript
// Optimize an image URL
const urlResult = await optimizeImage(
  "https://example.com/image.jpg",
  {
    width: 800,
    height: 600,
    quality: 85,
    format: "webp",
    placeholder: true
  }
);

// Optimize a file upload
const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
const file = fileInput.files[0];
const fileResult = await optimizeImage(file, {
  width: 1200,
  quality: 90,
  format: "avif"
});
```

##### Example Response
```typescript
// Success (200 OK)
{
  "src": "https://cdn.example.com/optimized/image-800x600.webp",
  "width": 800,
  "height": 600,
  "placeholder": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "originalSize": 2048576,
  "optimizedSize": 245760,
  "format": "webp",
  "quality": 85
}

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid image format",
    "details": {
      "allowedFormats": ["webp", "avif", "jpeg", "png"]
    }
  }
}

// Error (413 Payload Too Large)
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "Image exceeds maximum size limit",
    "details": {
      "maxSize": "10MB",
      "actualSize": "15MB"
    }
  }
}
```

#### Video Optimization
```typescript
interface VideoOptimizationOptions {
  quality: 'low' | 'medium' | 'high';
  format: 'mp4' | 'webm';
  maxDuration?: number;
  thumbnail?: boolean;
}

async function optimizeVideo(
  src: string | File,
  options: VideoOptimizationOptions
): Promise<OptimizedVideo>
```

##### Example Request
```typescript
// Optimize a video URL
const urlResult = await optimizeVideo(
  "https://example.com/video.mp4",
  {
    quality: "high",
    format: "webm",
    maxDuration: 300,
    thumbnail: true
  }
);

// Optimize a file upload
const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
const file = fileInput.files[0];
const fileResult = await optimizeVideo(file, {
  quality: "medium",
  format: "mp4",
  thumbnail: true
});
```

##### Example Response
```typescript
// Success (200 OK)
{
  "src": "https://cdn.example.com/optimized/video.webm",
  "duration": 295,
  "thumbnail": "https://cdn.example.com/thumbnails/video.jpg",
  "originalSize": 52428800,
  "optimizedSize": 15728640,
  "format": "webm",
  "quality": "high",
  "dimensions": {
    "width": 1920,
    "height": 1080
  }
}

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_FORMAT",
    "message": "Unsupported video format",
    "details": {
      "allowedFormats": ["mp4", "webm"]
    }
  }
}

// Error (413 Payload Too Large)
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "Video exceeds maximum size limit",
    "details": {
      "maxSize": "100MB",
      "actualSize": "150MB"
    }
  }
}
```

### Analytics Service

#### Track Event
```typescript
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

function trackEvent(event: AnalyticsEvent): void
```

##### Parameters
- `category`: Event category (e.g., 'User', 'Project')
- `action`: Event action (e.g., 'Click', 'View')
- `label`: Optional event label
- `value`: Optional numeric value
- `metadata`: Additional event data

##### Example Request
```typescript
// Track a button click
trackEvent({
  category: 'User',
  action: 'Click',
  label: 'Contact Button',
  metadata: {
    page: 'Home',
    section: 'Hero'
  }
});

// Track a project view
trackEvent({
  category: 'Project',
  action: 'View',
  label: 'Portfolio Item',
  value: 1,
  metadata: {
    projectId: 'proj_123',
    duration: 30
  }
});
```

##### Example Response
```typescript
// Success (204 No Content)
// No response body

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_EVENT",
    "message": "Invalid event category",
    "details": {
      "allowedCategories": ["User", "Project", "System"]
    }
  }
}
```

#### Track Page View
```typescript
interface PageViewData {
  path: string;
  title: string;
  referrer?: string;
}

function trackPageView(data: PageViewData): void
```

##### Example Request
```typescript
// Track page view
trackPageView({
  path: '/projects/web-design',
  title: 'Web Design Portfolio',
  referrer: 'https://google.com'
});
```

##### Example Response
```typescript
// Success (204 No Content)
// No response body

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_PATH",
    "message": "Invalid page path format"
  }
}
```

### Error Reporting

#### Report Error
```typescript
interface ErrorContext {
  message: string;
  stack?: string;
  metadata?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

function reportError(error: Error | string, context?: ErrorContext): void
```

##### Example Request
```typescript
// Report a caught error
try {
  throw new Error('Failed to load resource');
} catch (error) {
  reportError(error, {
    severity: 'high',
    metadata: {
      resourceType: 'image',
      url: 'https://example.com/image.jpg'
    }
  });
}

// Report a custom error
reportError('Custom Error', {
  message: 'Database connection failed',
  severity: 'critical',
  metadata: {
    dbHost: 'db.example.com',
    timestamp: new Date().toISOString()
  }
});
```

##### Example Response
```typescript
// Success (204 No Content)
// No response body

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_SEVERITY",
    "message": "Invalid error severity level",
    "details": {
      "allowedLevels": ["low", "medium", "high", "critical"]
    }
  }
}
```

#### Report Performance
```typescript
interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'score';
  context?: Record<string, any>;
}

function reportPerformance(metric: PerformanceMetric): void
```

##### Example Request
```typescript
// Report page load time
reportPerformance({
  name: 'page_load',
  value: 1250,
  unit: 'ms',
  context: {
    page: '/home',
    connection: '4g'
  }
});

// Report bundle size
reportPerformance({
  name: 'bundle_size',
  value: 156000,
  unit: 'bytes',
  context: {
    bundle: 'main.js',
    compression: 'gzip'
  }
});
```

##### Example Response
```typescript
// Success (204 No Content)
// No response body

// Error (400 Bad Request)
{
  "error": {
    "code": "INVALID_METRIC",
    "message": "Invalid metric unit",
    "details": {
      "allowedUnits": ["ms", "bytes", "score"]
    }
  }
}
```

### Utility APIs

### Theme Context
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);

function useTheme(): ThemeContextType
```

##### Example Usage
```typescript
// Using the Theme Hook
const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
};

// Using the Theme Context
const ThemeAwareComponent = () => {
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    // Set theme based on user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);
  
  return (
    <div className={`app-container ${theme}`}>
      {/* Theme-aware content */}
    </div>
  );
};
```

### Network Detection
```typescript
interface NetworkInfo {
  type: 'wifi' | '4g' | '3g' | '2g' | 'slow-2g' | 'offline';
  downlink: number;
  rtt: number;
  saveData: boolean;
}

function useNetwork(): NetworkInfo
```

##### Example Usage
```typescript
// Using Network Detection
const NetworkAwareImage = ({ src, fallback }) => {
  const network = useNetwork();
  
  // Choose image quality based on network
  const imageUrl = useMemo(() => {
    if (network.type === 'offline') {
      return fallback;
    }
    
    if (network.type === 'slow-2g' || network.type === '2g') {
      return `${src}?quality=low`;
    }
    
    if (network.saveData) {
      return `${src}?quality=medium`;
    }
    
    return `${src}?quality=high`;
  }, [network, src, fallback]);
  
  return <img src={imageUrl} alt="" />;
};

// Network Status Component
const NetworkStatus = () => {
  const network = useNetwork();
  
  return (
    <div>
      <p>Connection: {network.type}</p>
      <p>Downlink: {network.downlink} Mbps</p>
      <p>Round-trip time: {network.rtt}ms</p>
      <p>Data Saver: {network.saveData ? 'On' : 'Off'}</p>
    </div>
  );
};
```

### Media Support
```typescript
interface MediaSupport {
  webp: boolean;
  avif: boolean;
  webm: boolean;
  hevc: boolean;
}

function useMediaSupport(): MediaSupport
```

##### Example Usage
```typescript
// Using Media Support Detection
const OptimizedImage = ({ src }) => {
  const support = useMediaSupport();
  
  // Choose best supported format
  const optimizedSrc = useMemo(() => {
    if (support.avif) {
      return `${src}.avif`;
    }
    if (support.webp) {
      return `${src}.webp`;
    }
    return `${src}.jpg`;
  }, [support, src]);
  
  return <img src={optimizedSrc} alt="" />;
};

// Media Support Info Component
const MediaSupportInfo = () => {
  const support = useMediaSupport();
  
  return (
    <div>
      <h3>Supported Formats:</h3>
      <ul>
        <li>AVIF: {support.avif ? '✓' : '✗'}</li>
        <li>WebP: {support.webp ? '✓' : '✗'}</li>
        <li>WebM: {support.webm ? '✓' : '✗'}</li>
        <li>HEVC: {support.hevc ? '✓' : '✗'}</li>
      </ul>
    </div>
  );
};
```

## WebSocket APIs

### Real-time Updates

### Presence System
```typescript
interface PresenceData {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

interface PresenceSubscription {
  unsubscribe(): void;
}

class PresenceSystem {
  subscribe(userId: string): PresenceSubscription;
  updateStatus(status: PresenceData['status']): Promise<void>;
  getStatus(userId: string): Promise<PresenceData>;
}
```

### WebSocket Real-Time Updates

#### Connection Management
```typescript
interface WebSocketConfig {
  reconnect?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

class WebSocketClient {
  constructor(url: string, config?: WebSocketConfig);
  connect(): Promise<void>;
  disconnect(): void;
  on(event: string, callback: (data: any) => void): void;
  off(event: string): void;
}
```

##### Example Usage
```typescript
const ws = new WebSocketClient('wss://api.example.com/ws', {
  reconnect: true,
  maxRetries: 3,
  retryDelay: 1000
});

// Connect and handle events
await ws.connect();
ws.on('message', handleMessage);
ws.on('status', handleStatus);
ws.on('error', handleError);

// Cleanup
function cleanup() {
  ws.off('message');
  ws.off('status');
  ws.off('error');
  ws.disconnect();
}
```

### Network Detection

#### Network Status
```typescript
interface NetworkStatus {
  online: boolean;
  type?: 'wifi' | '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  downlink?: number;
  rtt?: number;
}

function getNetworkStatus(): NetworkStatus;
function onNetworkChange(callback: (status: NetworkStatus) => void): () => void;
```

##### Example Usage
```typescript
// Get current network status
const status = getNetworkStatus();
if (status.type === 'slow-2g' || status.rtt > 500) {
  // Adjust image quality for slow connection
  optimizeImage(src, { quality: 60, format: 'webp' });
}

// Monitor network changes
const unsubscribe = onNetworkChange((status) => {
  if (!status.online) {
    showOfflineMessage();
  } else {
    updateConnectionStatus(status);
  }
});

// Cleanup
unsubscribe();
