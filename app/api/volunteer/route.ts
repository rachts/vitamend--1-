import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const formData = await request.formData()

    const volunteerData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      age: formData.get("age") ? Number.parseInt(formData.get("age") as string) : null,
      address: formData.get("address") as string,
      occupation: formData.get("occupation") as string,
      experience: formData.get("experience") as string,
      qualifications: formData.get("qualifications") as string,
      roles: JSON.parse(formData.get("roles") as string),
      hoursPerWeek: formData.get("hoursPerWeek") ? Number.parseInt(formData.get("hoursPerWeek") as string) : null,
      preferredDays: formData.get("preferredDays") as string,
      motivation: formData.get("motivation") as string,
      status: "pending",
      appliedAt: new Date(),
    }

    // Update user to include volunteer application
    await User.findByIdAndUpdate(session.user.id, {
      $set: {
        volunteerApplication: volunteerData,
        role: "volunteer_applicant",
      },
    })

    return NextResponse.json({
      message: "Volunteer application submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting volunteer application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
