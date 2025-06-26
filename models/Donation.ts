import mongoose, { type Document, type Model } from "mongoose"

export interface IDonation extends Document {
  userId: mongoose.Types.ObjectId
  medicines: Array<{
    name: string
    quantity: number
    expiryDate: Date
    description?: string
    image?: string
  }>
  status: "pending" | "verified" | "rejected" | "collected" | "distributed" | "recalled"
  pickupAddress?: string
  pickupDate?: Date
  verificationNotes?: string
  verifiedBy?: mongoose.Types.ObjectId
  creditsEarned: number
  isReserved?: boolean
  createdAt: Date
  updatedAt: Date
}

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  description: String,
  image: String,
})

const DonationSchema = new mongoose.Schema<IDonation>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicines: [MedicineSchema],
    status: {
      type: String,
      enum: ["pending", "verified", "rejected", "collected", "distributed", "recalled"],
      default: "pending",
    },
    pickupAddress: String,
    pickupDate: Date,
    verificationNotes: String,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    creditsEarned: { type: Number, default: 0 },
    isReserved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
DonationSchema.index({ userId: 1, status: 1 })
DonationSchema.index({ status: 1, createdAt: -1 })

const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema)

export default Donation
