import Company from "../models/Company.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { slug, email, password } = req.body;

    if (!slug || !email || !password) {
      return res.status(400).json({
        message: "Company slug, email, and password are required",
      });
    }

    const company = await Company.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (company.status === "suspended") {
      return res.status(403).json({ message: "Company account suspended" });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      company: company._id,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
      },
      company: {
        _id: company._id,
        name: company.name,
        slug: company.slug,
        logo: company.logo,
        primaryColor: company.primaryColor,
        secondaryColor: company.secondaryColor,
        plan: company.plan,
        features: company.features,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        company: req.user.company._id,
      },
      company: {
        _id: req.user.company._id,
        name: req.user.company.name,
        slug: req.user.company.slug,
        logo: req.user.company.logo,
        primaryColor: req.user.company.primaryColor,
        secondaryColor: req.user.company.secondaryColor,
        plan: req.user.company.plan,
        features: req.user.company.features,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
