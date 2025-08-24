import { getFeedbacks } from '@/lib/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Feedback Submissions',
  description: 'View and manage all feedback submissions. Monitor user feedback, ratings, and suggestions for continuous improvement.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function FeedbackListPage() {
  const result = await getFeedbacks()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const feedbacks = result.data || []

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Feedback Submissions</h1>

        {feedbacks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No feedback submissions yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{feedback.name}</CardTitle>
                      <CardDescription>{feedback.email}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({feedback.rating}/5)
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedback.improvements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Improvement Areas:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {feedback.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm text-gray-600">{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feedback.otherSuggestion && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Additional Suggestions:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {feedback.otherSuggestion}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        Submitted: {new Date(feedback.createdAt).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        ID: {feedback.id}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
