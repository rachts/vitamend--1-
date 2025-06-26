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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Package, AlertCircle, CheckCircle, X, Heart } from "lucide-react"

export default function DonationForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    batchNumber: "",
    manufacturer: "",
    description: "",
    address: "",
    phone: "",
    preferredTime: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (files.length > 5) {
        toast({
          title: "Too many files",
          description: "Please select maximum 5 images",
          variant: "destructive",
        })
        return
      }
      setSelectedFiles(files)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const required = ["medicineName", "quantity", "unit", "expiryDate", "address", "phone"]
    const missing = required.filter((field) => !formData[field as keyof typeof formData])

    if (missing.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missing.join(", ")}`,
        variant: "destructive",
      })
      return false
    }

    if (selectedFiles.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of the medicine",
        variant: "destructive",
      })
      return false
    }

    // Check expiry date
    const expiryDate = new Date(formData.expiryDate)
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

    if (expiryDate < sixMonthsFromNow) {
      toast({
        title: "Invalid Expiry Date",
        description: "Medicine must have at least 6 months validity remaining",
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
      const submitData = new FormData()

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })

      // Add files
      selectedFiles.forEach((file, index) => {
        submitData.append(`image_${index}`, file)
      })

      const response = await fetch("/api/donations", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit donation")
      }

      const result = await response.json()

      toast({
        title: "Donation Submitted Successfully! 🎉",
        description: "Thank you for your generous donation. We'll contact you within 24 hours to arrange pickup.",
      })

      // Reset form
      setFormData({
        medicineName: "",
        quantity: "",
        unit: "",
        expiryDate: "",
        batchNumber: "",
        manufacturer: "",
        description: "",
        address: "",
        phone: "",
        preferredTime: "",
      })
      setSelectedFiles([])

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error submitting donation:", error)
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
          <CardDescription>Please sign in to donate medicines</CardDescription>
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
          <Package className="h-6 w-6 text-green-600" />
          Medicine Donation Form
        </CardTitle>
        <CardDescription className="text-base">
          Please provide accurate details about the medicines you'd like to donate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Medicine Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Medicine Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicineName">Medicine Name *</Label>
                <Input
                  id="medicineName"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="e.g., Paracetamol 500mg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  placeholder="e.g., Cipla, Sun Pharma"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="tablets, capsules, ml"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleInputChange}
                placeholder="Optional - if visible on packaging"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Notes</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Any additional information about the medicine, storage conditions, etc."
                rows={3}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Medicine Images *</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Upload Medicine Photos</p>
              <p className="text-sm text-gray-500 mb-4">
                Clear photos of packaging, labels, and expiry dates (Max 5 images, 5MB each)
              </p>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("images")?.click()}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Choose Images
              </Button>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Images:</p>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pickup Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pickup Information</h3>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Complete address where we can collect the medicines"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Pickup Time</Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  placeholder="e.g., Morning (9-12), Evening (4-7)"
                />
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Important:</strong> By submitting this form, you confirm that the medicines are unexpired, stored
              properly, and you have the legal right to donate them. Our team will verify all donations before
              redistribution to ensure safety and quality.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Donation...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5 mr-2" />
                  Submit Medicine Donation
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
