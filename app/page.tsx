import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Award, CheckCircle, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="VitaMend Logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 md:h-20 md:w-20"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  VitaMend
                </h1>
                <p className="text-lg md:text-xl text-green-700 font-medium">Reviving Medicines, Restoring Lives</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Connect unused medicines with those in need. Join our mission to reduce medical waste and help communities
              access essential medications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Donate Medicines
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              >
                <Link href="/volunteer" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Become a Volunteer
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>AI-Verified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Secure & Transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Direct Impact Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How VitaMend Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple, secure process ensures your donated medicines reach those who need them most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">1. Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload photos of your unused, unexpired medicines through our secure platform
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">2. Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our AI system and certified pharmacists verify medicine quality and authenticity
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">3. Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We match verified medicines with verified NGOs and healthcare providers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">4. Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track your real-world impact and see how your donations help communities
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Growing Impact</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Together, we're making healthcare more accessible and sustainable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Medicines Donated</div>
              <div className="text-sm opacity-75 mt-2">Verified and redistributed</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <div className="text-lg opacity-90">People Helped</div>
              <div className="text-sm opacity-75 mt-2">Across 15+ states</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Active Volunteers</div>
              <div className="text-sm opacity-75 mt-2">Pharmacists and helpers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose VitaMend?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most trusted and efficient platform for medicine donation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Verification</h3>
              <p className="text-gray-600">
                Advanced AI technology combined with expert pharmacist review ensures only safe, quality medicines are
                redistributed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heart className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Impact</h3>
              <p className="text-gray-600">
                See exactly how your donations help real people in your community and beyond with detailed impact
                reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
              <p className="text-gray-600">
                We work with verified NGOs, hospitals, and healthcare providers to ensure medicines reach those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of donors and volunteers who are helping to reduce medical waste and improve healthcare
              access for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link href="/auth/signup" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
