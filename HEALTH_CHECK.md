# Database Health Check System

## Overview

The feedback form application now includes a comprehensive database health monitoring system that:

1. **Keeps Database Connection Alive**: Performs regular health checks to prevent connection timeouts
2. **Real-time Monitoring**: Shows connection status with visual indicators
3. **Toast Notifications**: Provides user feedback on database status
4. **Automatic Recovery**: Attempts to reconnect if connection fails

## Features

### 🔄 Automatic Health Checks
- Runs every **3 minutes** in the background
- Performs lightweight `SELECT 1` queries to test connection
- Logs status to console for debugging

### 🎯 Toast Notifications
- **Success Toast**: Shows when app initially connects (one-time)
- **Error Toasts**: Shows when database connection fails
- **Custom Messages**: Different messages for different failure types

### 📊 Visual Health Indicator
- **Green Circle**: Database connected and healthy
- **Red Circle**: Database connection failed
- **Yellow Circle**: Checking connection status
- Shows last check timestamp

### ⚡ Real-time Status
- Updates every 2 minutes for visual indicator
- Immediate feedback on connection issues
- Timestamp of last successful check

## Implementation Details

### Server Action: `healthCheck()`
```typescript
// Location: src/lib/actions.ts
export async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return {
      success: true,
      message: 'Database connection is healthy',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    }
  }
}
```

### Custom Hook: `useHealthCheck()`
```typescript
// Location: src/hooks/useHealthCheck.ts
// Configurable intervals and toast preferences
useHealthCheck({
  intervalMs: 3 * 60 * 1000,     // 3 minutes
  showSuccessToast: false,        // Don't spam success
  showErrorToast: true,          // Show errors
})
```

### Health Status Component
```typescript
// Location: src/components/ui/health-status.tsx
// Visual indicator with real-time updates
<HealthStatus
  className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
  showLabel={true}
/>
```

## Usage

### In Components
```typescript
import { useHealthCheck } from '@/hooks/useHealthCheck'

// Basic usage with defaults
const { manualHealthCheck } = useHealthCheck()

// Custom configuration
const { manualHealthCheck } = useHealthCheck({
  intervalMs: 5 * 60 * 1000,  // 5 minutes
  showSuccessToast: true,      // Show success messages
  showErrorToast: true,        // Show error messages
})

// Manual health check
const checkNow = async () => {
  const result = await manualHealthCheck()
  console.log('Health check result:', result)
}
```

### Manual Health Check
You can trigger a manual health check from anywhere in the app:
```typescript
import { healthCheck } from '@/lib/actions'

const result = await healthCheck()
if (result.success) {
  console.log('Database is healthy')
} else {
  console.error('Database error:', result.error)
}
```

## Configuration Options

### Health Check Intervals
- **Default**: 3 minutes (180,000ms)
- **Recommended**: 2-5 minutes for development
- **Production**: 5-10 minutes to reduce load

### Toast Settings
- **showSuccessToast**: `false` (prevents spam)
- **showErrorToast**: `true` (important for users)
- **Duration**: 2-5 seconds depending on message type

### Visual Indicator
- **Update Interval**: 2 minutes
- **Position**: Top-right corner
- **Styling**: Semi-transparent backdrop with glassmorphism

## Benefits

1. **Prevents Connection Timeouts**: Regular pings keep database awake
2. **User Awareness**: Visual feedback on system status
3. **Debugging Aid**: Console logs help identify issues
4. **Graceful Degradation**: App continues working during brief outages
5. **Automatic Recovery**: Reconnects when database comes back online

## Monitoring

### Console Logs
```
✅ Database health check passed: 2025-08-24T12:34:56.789Z
❌ Database health check failed: Connection timeout
```

### Visual Indicators
- Green dot: All systems operational
- Red dot: Connection issues detected
- Yellow dot: Status checking in progress

### Toast Messages
- "Database Connected" - Initial success
- "Database Status: Connection is healthy" - Manual check success
- "Database Status: Connection failed" - Error detected

## Troubleshooting

### Common Issues
1. **Connection Timeouts**: Check network connectivity
2. **SSL Errors**: Verify database URL has correct SSL parameters
3. **Rate Limiting**: Increase interval if too many requests

### Error Messages
- "Database connection failed" - General connection error
- "Health check failed - network error" - Network/DNS issues
- "Connection timeout" - Database server unresponsive

This health check system ensures your feedback form maintains a reliable connection to the PostgreSQL database while providing clear feedback to users about the system status.
