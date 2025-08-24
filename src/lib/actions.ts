'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface FeedbackFormData {
  name: string
  email: string
  rating: number
  improvements: string[]
  otherSuggestion?: string
}

export async function submitFeedback(data: FeedbackFormData) {
  try {
    // Validate the data
    if (!data.name || !data.email || !data.rating) {
      return {
        success: false,
        error: 'Name, email, and rating are required fields.'
      }
    }

    if (data.rating < 1 || data.rating > 5) {
      return {
        success: false,
        error: 'Rating must be between 1 and 5.'
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      }
    }

    // Create the feedback in the database
    const feedback = await prisma.feedback.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        rating: data.rating,
        improvements: data.improvements,
        otherSuggestion: data.otherSuggestion?.trim() || null,
      },
    })

    // Optional: Revalidate the path if you have a feedback list page
    revalidatePath('/feedback')

    return {
      success: true,
      message: 'Thank you for your feedback! It has been submitted successfully.',
      feedbackId: feedback.id
    }
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return {
      success: false,
      error: 'An error occurred while submitting your feedback. Please try again.'
    }
  }
}

export async function getFeedbacks() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { success: true, data: feedbacks }
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    return { success: false, error: 'Failed to fetch feedbacks.' }
  }
}

export async function healthCheck() {
  try {
    // Simple database ping to keep connection alive
    await prisma.$queryRaw`SELECT 1`

    return {
      success: true,
      message: 'Database connection is healthy',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Database health check failed:', error)
    return {
      success: false,
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    }
  }
}
