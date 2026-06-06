import AppError from "../utils/appError.js";
import { getCoordinatesForAddress } from "../utils/location.js";
import Place from "../models/places.model.js";
import User from "../models/users.model.js";
import mongoose from "mongoose";

export const getPLaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    const err = new AppError("Something went wrong", 500);
    console.log(error);
    return next(error);
  }

  if (!place) {
    const error = new AppError(
      "Could not find a place for the provided id.",
      404,
    );
    return next(error);
  }

  return res.json({
    message: "Detail fetch successfully",
    data: place.toObject({ getters: true }),
  });
};

export const getPlacesByUserId = async (req, res, next) => {
  const uid = req.params.uid;

  let places;

  try {
    places = await Place.find({ creator: uid });
  } catch (error) {
    const err = new AppError("Something went wrong", 500);
    console.log(error);
    return next(err);
  }

  if (!places) {
    throw new AppError("Could not find a place for the provided user id.", 404);
  }

  return res.json({
    message: "Places retrieved successfully",
    data: places.map((p) => p.toObject({ getters: true })),
  });
};

export const createPlace = async (req, res, next) => {
  const { title, description, creator, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const payload = {
    title,
    description,
    creator,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
  };
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.findById(creator).session(session);
    if (!user) {
      const error = new AppError(
        "Could not find a user for the provided id.",
        404,
      );
      throw error;
    }

    const createPlace = await Place.create([payload], { session });
    console.log(createPlace);
    user.places.push(createPlace[0]._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      message: "Place created",
      data: createPlace[0].toObject({ getters: true }),
    });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    const err = new AppError("Could not create a place.", 400);
    console.log(error);
    return next(err);
  }
};

export const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
    if (!place) {
      const error = new AppError(
        "Could not find a place for the provided id.",
        404,
      );
      return next(error);
    }
    place.title = title;
    place.description = description;
    await place.save();
  } catch (error) {
    const err = new AppError("Could not update place.", 500);
    console.log(error);
    return next(err);
  }

  res.status(200).json({
    message: "Place updated",
    data: { place: place.toObject({ getters: true }) },
  });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
    if (!place) {
      const error = new AppError(
        "Could not find a place for the provided id.",
        404,
      );
      return next(error);
    }
  } catch (error) {
    const err = new AppError("Could not delete place.", 500);
    console.log(error);
    return next(err);
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await place.deleteOne({ session });

    place.creator.places.pull(place);
    await place.creator.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    const err = new AppError("Could not delete place.", 500);
    console.log(error);
    return next(err);
  }

  res.status(200).json({ message: "Place deleted" });
};
