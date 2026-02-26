import { Router } from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  signupUser,
} from "../controller/users.controller.js";
import validate from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schemas/users.schemas.js";

const router = Router();

router.get("/", getUsers);

router.post("/login", validate(loginSchema), loginUser);
router.delete("/:uid", deleteUser);

router.post("/signup", validate(signupSchema), signupUser);

export default router;
