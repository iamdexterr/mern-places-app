import { Router } from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  signupUser,
} from "../controller/users.controller.js";
import validate from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schemas/users.schemas.js";
import fileUpload from "../middleware/fileupload.js";

const router = Router();

router.get("/", getUsers);

router.post("/login", validate(loginSchema), loginUser);
router.delete("/:uid", deleteUser);

router.post(
  "/signup",
  fileUpload.single("image"),
  validate(signupSchema),
  signupUser,
);

export default router;
