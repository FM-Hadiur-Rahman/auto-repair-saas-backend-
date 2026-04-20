export const companyScope = (req, res, next) => {
  if (!req.user?.company?._id) {
    return res.status(403).json({ message: "Company context missing" });
  }

  req.companyFilter = {
    company: req.user.company._id,
  };

  next();
};
