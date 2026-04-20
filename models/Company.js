import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    domain: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    logo: {
      type: String,
      default: "",
    },
    primaryColor: {
      type: String,
      default: "#2563eb",
    },
    secondaryColor: {
      type: String,
      default: "#0f172a",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "trial", "suspended"],
      default: "active",
    },
    plan: {
      type: String,
      enum: ["basic", "standard", "premium"],
      default: "basic",
    },
    features: {
      appointments: { type: Boolean, default: true },
      inventory: { type: Boolean, default: true },
      invoices: { type: Boolean, default: true },
      reports: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Company", companySchema);
