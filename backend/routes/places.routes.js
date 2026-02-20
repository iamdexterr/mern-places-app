import { Router } from "express";
import {
  createPlace,
  deletePlace,
  getPLaceById,
  getPlacesByUserId,
  updatePlace,
} from "../controller/places.controller.js";
import validate from "../middleware/validate.js";
import {
  createPlaceSchema,
  updatePlaceSchema,
} from "../schemas/places.schemas.js";

const router = Router();

router.get("/:pid", getPLaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", validate(createPlaceSchema), createPlace);

router.patch("/:pid", validate(updatePlaceSchema), updatePlace);

router.delete("/:pid", deletePlace);

export default router;
