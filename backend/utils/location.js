import axios from "axios";
import AppError from "./appError.js";

export const getCoordinatesForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`,
  );
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new AppError(
      "Could not find location for the specified address.",
      422,
    );
    return next(error);
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
};
