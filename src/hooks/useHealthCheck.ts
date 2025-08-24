'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { healthCheck } from '@/lib/actions'

interface UseHealthCheckOptions {
  intervalMs?: number // Health check interval in milliseconds
  showSuccessToast?: boolean // Whether to show success toasts
  showErrorToast?: boolean // Whether to show error toasts
}

export function useHealthCheck({
  intervalMs = 5 * 60 * 1000, // Default: 5 minutes
  showSuccessToast = false, // Don't spam success messages by default
  showErrorToast = true, // Show error messages
}: UseHealthCheckOptions = {}) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isActiveRef = useRef(true)

  useEffect(() => {
    const performHealthCheck = async () => {
      if (!isActiveRef.current) return

      try {
        const result = await healthCheck()

        if (result.success) {
          if (showSuccessToast) {
            toast.success('Database Status', {
              description: 'Connection is healthy',
              duration: 2000,
            })
          }
          console.log('✅ Database health check passed:', result.timestamp)
        } else {
          if (showErrorToast) {
            toast.error('Database Status', {
              description: 'Connection failed - attempting to reconnect',
              duration: 4000,
            })
          }
          console.error('❌ Database health check failed:', result.error)
        }
      } catch (error) {
        if (showErrorToast) {
          toast.error('Database Status', {
            description: 'Health check failed - network error',
            duration: 4000,
          })
        }
        console.error('❌ Health check network error:', error)
      }
    }

    // Perform initial health check
    performHealthCheck()

    // Set up interval for regular health checks
    intervalRef.current = setInterval(performHealthCheck, intervalMs)

    // Cleanup function
    return () => {
      isActiveRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [intervalMs, showSuccessToast, showErrorToast])

  // Manual health check function
  const manualHealthCheck = async () => {
    try {
      const result = await healthCheck()

      if (result.success) {
        toast.success('Database Status', {
          description: 'Connection is healthy',
          duration: 3000,
        })
      } else {
        toast.error('Database Status', {
          description: result.error || 'Connection failed',
          duration: 4000,
        })
      }

      return result
    } catch (error) {
      toast.error('Database Status', {
        description: 'Health check failed - network error',
        duration: 4000,
      })
      throw error
    }
  }

  return { manualHealthCheck }
}
