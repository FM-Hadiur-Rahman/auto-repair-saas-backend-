import express from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { companyScope } from "../middleware/companyScope.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, companyScope, getCustomers)
  .post(
    protect,
    companyScope,
    allowRoles("owner", "manager", "advisor"),
    createCustomer,
  );

router
  .route("/:id")
  .get(protect, companyScope, getCustomerById)
  .put(
    protect,
    companyScope,
    allowRoles("owner", "manager", "advisor"),
    updateCustomer,
  )
  .delete(
    protect,
    companyScope,
    allowRoles("owner", "manager"),
    deleteCustomer,
  );

export default router;
