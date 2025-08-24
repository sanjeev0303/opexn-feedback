import FeedbackForm from '@/components/global/Feedback-form'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Share Your Feedback - Help Us Improve',
  description: 'Rate your experience and provide valuable feedback. Help us improve our roundtable discussions and services.',
  openGraph: {
    title: 'Share Your Feedback - Help Us Improve',
    description: 'Rate your experience and provide valuable feedback. Help us improve our roundtable discussions and services.',
    type: 'website',
  },
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Feedback Form",
  "description": "Interactive feedback form for collecting user experiences and improvement suggestions",
  "url": "http://localhost:3000",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Feedback Team"
  },
  "potentialAction": {
    "@type": "ReviewAction",
    "target": "http://localhost:3000",
    "result": {
      "@type": "Review",
      "reviewBody": "User feedback and experience rating"
    }
  }
}

const Home = () => {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div>
        <div className="fixed top-4 right-4 z-10 flex items-center gap-4">
          {/* <Link
            href="/admin"
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            View Submissions
          </Link> */}
        </div>
        <FeedbackForm />
      </div>
    </>
  )
}

export default Home
