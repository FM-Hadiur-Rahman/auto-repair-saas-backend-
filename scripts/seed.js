import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Company.deleteMany({});

    const company = await Company.create({
      name: "AutoFix Duisburg",
      slug: "autofix-duisburg",
      email: "info@autofix.de",
      phone: "+49 000000000",
      address: "Duisburg, Germany",
      plan: "premium",
      status: "active",
    });

    await User.create({
      company: company._id,
      name: "Owner Admin",
      email: "owner@autofix.de",
      password: "123456",
      role: "owner",
    });

    console.log("Seed completed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
