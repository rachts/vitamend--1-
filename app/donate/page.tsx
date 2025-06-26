import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DonationForm from "./donation-form"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Heart, Users } from "lucide-react"

export default async function DonatePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin?callbackUrl=/donate")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative h-16 w-16">
                <Image src="/logo.png" alt="VitaMend Logo" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#1a472a]">Donate Medicines</h1>
                <p className="text-lg text-green-600 font-medium">Make a Life-Saving Impact</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your unused medicines into hope for those in need. Every donation is verified by our expert team
              and delivered to communities that need it most.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 border-green-200 bg-green-50">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">AI Verified</h3>
              <p className="text-sm text-green-700">Every medicine is verified for safety and quality</p>
            </Card>
            <Card className="text-center p-6 border-blue-200 bg-blue-50">
              <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">Direct Impact</h3>
              <p className="text-sm text-blue-700">See exactly how your donation helps real people</p>
            </Card>
            <Card className="text-center p-6 border-purple-200 bg-purple-50">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800 mb-2">Trusted Network</h3>
              <p className="text-sm text-purple-700">Connected with verified NGOs and hospitals</p>
            </Card>
            <Card className="text-center p-6 border-orange-200 bg-orange-50">
              <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-orange-800 mb-2">Easy Process</h3>
              <p className="text-sm text-orange-700">Simple 3-step donation process</p>
            </Card>
          </div>

          {/* Important Guidelines */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Before You Donate - Important Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Medicines must be unexpired (at least 6 months validity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Original packaging with clear labels required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Medicines should be stored in proper conditions</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Remove personal information from prescription labels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Take clear photos of medicine packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Ensure medicines are not damaged or tampered</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Donation Form */}
          <DonationForm />
        </div>
      </div>
    </div>
  )
}
