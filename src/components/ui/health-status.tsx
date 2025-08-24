'use client'

import { useState, useEffect } from 'react'
import { Circle } from 'lucide-react'
import { healthCheck } from '@/lib/actions'

interface HealthStatusProps {
  className?: string
  showLabel?: boolean
}

export function HealthStatus({ className = "", showLabel = true }: HealthStatusProps) {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking')
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await healthCheck()
        setStatus(result.success ? 'healthy' : 'error')
        setLastCheck(new Date())
      } catch {
        setStatus('error')
        setLastCheck(new Date())
      }
    }

    // Initial check
    checkHealth()

    // Check every 2 minutes
    const interval = setInterval(checkHealth, 2 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'Database Connected'
      case 'error':
        return 'Database Error'
      default:
        return 'Checking...'
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Circle className={`w-3 h-3 ${getStatusColor()}`} fill="currentColor" />
      {showLabel && (
        <span className="text-sm text-gray-600">
          {getStatusText()}
          {lastCheck && (
            <span className="text-xs text-gray-400 ml-1">
              ({lastCheck.toLocaleTimeString()})
            </span>
          )}
        </span>
      )}
    </div>
  )
}
