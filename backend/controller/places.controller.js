import AppError from "../utils/appError.js";
import { v4 as uuidv4 } from "uuid";
import { getCoordinatesForAddress } from "../utils/location.js";

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export const getPLaceById = (req, res, next) => {
  const pid = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === pid);

  if (!place) {
    const error = new AppError(
      "Could not find a place for the provided id.",
      404,
    );
    return next(error);
  }

  return res.json({ place });
};

export const getPlacesByUserId = (req, res, next) => {
  const uid = req.params.uid;
  const places = DUMMY_PLACES.filter((place) => place.creator === uid);

  if (!places || places.length === 0) {
    throw new AppError("Could not find a place for the provided user id.", 404);
  }

  return res.json({ places });
};

export const createPlace = async (req, res, next) => {
  const { title, description, creator, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    creator,
    address,
    location: coordinates,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ message: "Place created", data: createdPlace });
};

export const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  const updatedPlace = { ...DUMMY_PLACES[placeIndex] };
  if (!updatedPlace) {
    throw new AppError("Could not find a place for the provided id.", 404);
  }
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ message: "Place updated", data: updatedPlace });
};
export const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);

  res.status(200).json({ message: "Place deleted" });
};
