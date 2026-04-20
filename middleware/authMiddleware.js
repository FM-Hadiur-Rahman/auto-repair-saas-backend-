import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId)
      .populate("company")
      .select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User not found or inactive" });
    }

    if (!user.company || user.company.status === "suspended") {
      return res
        .status(403)
        .json({ message: "Company suspended or unavailable" });
    }

    req.user = user;
    req.companyId = user.company._id.toString();

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
