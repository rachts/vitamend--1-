import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/dbConnect"
import Donation from "@/models/Donation"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const donations = await Donation.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(10)

    return NextResponse.json({ donations })
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const formData = await request.formData()

    const donationData = {
      userId: session.user.id,
      medicineName: formData.get("medicineName") as string,
      quantity: Number.parseInt(formData.get("quantity") as string),
      unit: formData.get("unit") as string,
      expiryDate: new Date(formData.get("expiryDate") as string),
      batchNumber: formData.get("batchNumber") as string,
      manufacturer: formData.get("manufacturer") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      preferredTime: formData.get("preferredTime") as string,
      status: "pending",
      images: [], // In a real app, you'd handle file uploads here
    }

    const donation = new Donation(donationData)
    await donation.save()

    return NextResponse.json({
      message: "Donation submitted successfully",
      donationId: donation._id,
    })
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
