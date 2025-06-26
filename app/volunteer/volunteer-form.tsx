"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Heart, CheckCircle, Users } from "lucide-react"

const volunteerRoles = [
  {
    id: "verification",
    label: "Medicine Verification",
    description: "Help verify donated medicines using our AI-powered tools",
    requirements: "Basic medical knowledge helpful but not required",
  },
  {
    id: "pickup",
    label: "Pickup & Delivery",
    description: "Collect medicines from donors and deliver to NGOs",
    requirements: "Own transportation required",
  },
  {
    id: "outreach",
    label: "Community Outreach",
    description: "Spread awareness about medicine donation in communities",
    requirements: "Good communication skills",
  },
  {
    id: "admin",
    label: "Administrative Support",
    description: "Help with documentation, coordination, and data management",
    requirements: "Basic computer skills",
  },
  {
    id: "tech",
    label: "Technical Support",
    description: "Help improve our platform and AI verification systems",
    requirements: "Programming or technical background",
  },
]

export default function VolunteerForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(" ")[0] || "",
    lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
    email: session?.user?.email || "",
    phone: "",
    age: "",
    address: "",
    occupation: "",
    experience: "",
    qualifications: "",
    hoursPerWeek: "",
    preferredDays: "",
    motivation: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles((prev) => [...prev, roleId])
    } else {
      setSelectedRoles((prev) => prev.filter((id) => id !== roleId))
    }
  }

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone", "motivation"]
    const missing = required.filter((field) => !formData[field as keyof typeof formData])

    if (missing.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missing.join(", ")}`,
        variant: "destructive",
      })
      return false
    }

    if (selectedRoles.length === 0) {
      toast({
        title: "Select Volunteer Roles",
        description: "Please select at least one way you'd like to help",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const submitData = {
        ...formData,
        selectedRoles,
        userId: session?.user?.id,
      }

      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Thank you for your interest in volunteering. We'll contact you within 48 hours with next steps.",
      })

      // Reset form
      setFormData({
        firstName: session?.user?.name?.split(" ")[0] || "",
        lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
        email: session?.user?.email || "",
        phone: "",
        age: "",
        address: "",
        occupation: "",
        experience: "",
        qualifications: "",
        hoursPerWeek: "",
        preferredDays: "",
        motivation: "",
        emergencyContact: "",
        emergencyPhone: "",
      })
      setSelectedRoles([])

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error submitting volunteer application:", error)
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>Please sign in to submit a volunteer application</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/auth/signin")} className="w-full">
            Sign In to Continue
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Heart className="h-6 w-6 text-red-500" />
          Volunteer Application
        </CardTitle>
        <CardDescription className="text-base">
          Join our mission to connect medicines with those in need. Every volunteer makes a difference!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="16"
                  max="100"
                  placeholder="18"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="e.g., Student, Pharmacist, Doctor, Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your complete address"
                rows={3}
              />
            </div>
          </div>

          {/* Professional Background */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Background & Experience</h3>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Education & Qualifications</Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                placeholder="Your educational background, certifications, licenses, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Any experience in healthcare, pharmacy, volunteer work, or related fields"
                rows={3}
              />
            </div>
          </div>

          {/* Volunteer Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">How Would You Like to Help?</h3>
            <p className="text-sm text-gray-600">Select all areas where you'd like to contribute:</p>

            <div className="space-y-4">
              {volunteerRoles.map((role) => (
                <Card
                  key={role.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedRoles.includes(role.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={role.id}
                      checked={selectedRoles.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={role.id} className="font-medium cursor-pointer text-base">
                        {role.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        <strong>Requirements:</strong> {role.requirements}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Availability</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Hours per week you can volunteer</Label>
                <Input
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  min="1"
                  max="40"
                  placeholder="e.g., 5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDays">Preferred Days/Times</Label>
                <Input
                  id="preferredDays"
                  name="preferredDays"
                  value={formData.preferredDays}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekends, Weekday evenings"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to volunteer with VitaMend? *</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Tell us about your motivation to help and what you hope to achieve through volunteering"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Emergency Contact</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Full name of emergency contact"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Commitment:</strong> By submitting this application, you agree to undergo a background
              verification process, attend orientation training, and commit to maintaining confidentiality of all donor
              and recipient information. You can withdraw from volunteering at any time.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              disabled={isSubmitting || selectedRoles.length === 0}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <Users className="h-5 w-5 mr-2" />
                  Submit Volunteer Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
