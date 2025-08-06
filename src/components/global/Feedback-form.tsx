"use client"

import { useState } from "react"
import { Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox component

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([])
  const [otherImprovementText, setOtherImprovementText] = useState("")

  const improvementOptions = [
    "Topic & Content The subject matter or the points discussed.",
    "Accommodation The way the discussion was facilitated and guided.",
    "Pacing & Time Management The flow and length of the session.",
    "Audience Interaction Opportunities for questions and participation.",
    "Logistics The venue, technology, or pre-event communication.",
    "No improvements needed, I was satisfied.",
    "Other (please specify): _______",
  ]

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedImprovements((prev) => [...prev, option])
    } else {
      setSelectedImprovements((prev) => prev.filter((item) => item !== option))
      if (option === "Other (please specify): _______") {
        setOtherImprovementText("") // Clear text if "Other" is unchecked
      }
    }
  }

  const isOtherSelected = selectedImprovements.includes("Other (please specify): _______")

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main heading and description on the dark blue background */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg font-playfair-display">
          Drop Your Feedback Here!
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-inter">
          We are constantly striving to improve. Please share your valuable feedback with us.
        </p>
      </div>

      {/* Feedback Card */}
      <Card className="w-full max-w-2xl bg-background text-foreground shadow-lg rounded-xl">
        <CardHeader className="text-center space-y-2 p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight font-playfair-display">
            Provide Your Valuable Expericence
          </CardTitle>
          <CardDescription className="text-md md:text-lg text-muted-foreground font-inter">
            Help us improve by sharing your experience and suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 p-6 md:p-8">
          {/* Star Rating Section */}
          <div className="grid gap-2 text-center">
            <Label htmlFor="rating" className="text-lg font-semibold mb-2 font-roboto">
              How would you rate your experience?
            </Label>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-roboto">Name</Label>
              <Input id="name" placeholder="John Doe" className="font-roboto" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-roboto">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" className="font-roboto" />
            </div>

            {/* New Roundtable Improvement Section */}
            <div className="grid gap-2">
              <Label className="text-lg font-semibold mb-2 font-roboto">
                For our next roundtable, which of the following areas could be improved?
              </Label>
              <div className="grid gap-3">
                {improvementOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.replace(/[^a-zA-Z0-9]/g, "")} // Simple ID for checkbox
                      checked={selectedImprovements.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                    />
                    <Label htmlFor={option.replace(/[^a-zA-Z0-9]/g, "")} className="font-roboto text-sm md:text-base">
                      {option}
                    </Label>
                  </div>
                ))}
                {isOtherSelected && (
                  <Textarea
                    id="other-improvement-text"
                    placeholder="Please specify your other suggestions..."
                    className="min-h-[80px] font-roboto mt-2"
                    value={otherImprovementText}
                    onChange={(e) => setOtherImprovementText(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-6 md:p-8">
          <Button type="submit" className="px-8 py-3 text-lg font-semibold font-roboto">
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
