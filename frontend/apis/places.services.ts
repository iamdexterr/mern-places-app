import apiClient from "./api-client";

export const createPlace = async (data: {
  title: string;
  address: string;
  description: string;
  creator: string;
}) => {
  const res = await apiClient.post("/places", data);
  return res.data;
};

export const getPlacesByUserId = async (userId: string) => {
  const res = await apiClient.get(`/places/user/${userId}`);
  return res.data.data;
};

export const getPlaceDetails = async (placeId: string) => {
  const res = await apiClient.get(`/places/${placeId}`);
  return res.data.data;
};

export const updatePlace = async (data: {
  placeId: string;
  title: string;
  description: string;
}) => {
  const { placeId, ...payload } = data;
  const res = await apiClient.patch(`/places/${placeId}`, payload);
  return res.data;
};

export const deletePlace = async (placeId: string) => {
  const res = await apiClient.delete(`/places/${placeId}`);
  return res.data;
};
