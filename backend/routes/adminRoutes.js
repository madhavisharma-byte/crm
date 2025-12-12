import express from "express";
import { body, param } from "express-validator";
import {
  createUserByAdmin,
  listUsers,
  updateUserRole,
} from "../controllers/adminController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", listUsers);

router.post(
  "/users",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["admin", "manager", "user"]),
  ],
  createUserByAdmin
);

router.patch(
  "/users/:id/role",
  [param("id").isMongoId(), body("role").isIn(["admin", "manager", "user"])],
  updateUserRole
);

export default router;

