import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import VolunteerForm from "./volunteer-form"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Award, CheckCircle } from "lucide-react"

export default async function VolunteerPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin?callbackUrl=/volunteer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative h-16 w-16">
                <Image src="/logo.png" alt="VitaMend Logo" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#1a472a]">Become a Volunteer</h1>
                <p className="text-lg text-blue-600 font-medium">Join Our Mission of Hope</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our community of dedicated volunteers helping to verify medicine donations and ensure they reach
              those who need them most. Make a real difference in healthcare accessibility.
            </p>
          </div>

          {/* Volunteer Opportunities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
              <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-800 mb-2">Medicine Verification</h3>
              <p className="text-sm text-green-700">
                Help verify donated medicines for quality and authenticity using our AI tools
              </p>
            </Card>
            <Card className="text-center p-6 border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-800 mb-2">Pickup & Delivery</h3>
              <p className="text-sm text-blue-700">
                Assist with collecting medicines from donors and delivering to NGOs
              </p>
            </Card>
            <Card className="text-center p-6 border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
              <Heart className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-purple-800 mb-2">Community Outreach</h3>
              <p className="text-sm text-purple-700">Help spread awareness about medicine donation in your community</p>
            </Card>
            <Card className="text-center p-6 border-orange-200 bg-orange-50 hover:shadow-lg transition-shadow">
              <Award className="h-10 w-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-orange-800 mb-2">Administrative Support</h3>
              <p className="text-sm text-orange-700">Help with documentation, coordination, and platform management</p>
            </Card>
          </div>

          {/* Why Volunteer Section */}
          <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Why Volunteer with VitaMend?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Make Real Impact</h4>
                      <p className="text-blue-700 text-sm">Directly help people access life-saving medications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Flexible Schedule</h4>
                      <p className="text-blue-700 text-sm">
                        Volunteer on your own time, as much or as little as you can
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Learn & Grow</h4>
                      <p className="text-blue-700 text-sm">
                        Gain experience in healthcare, technology, and social impact
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Join Community</h4>
                      <p className="text-blue-700 text-sm">
                        Connect with like-minded people passionate about healthcare
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Recognition</h4>
                      <p className="text-blue-700 text-sm">Get certificates and recognition for your contributions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Training Provided</h4>
                      <p className="text-blue-700 text-sm">Complete training and support to help you succeed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Form */}
          <VolunteerForm />
        </div>
      </div>
    </div>
  )
}
