import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPlace,
  deletePlace,
  getPlaceDetails,
  getPlacesByUserId,
  updatePlace,
} from "../../apis/places.services";
import { toast } from "sonner";

export const useCreatePlace = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: createPlace,
    onSuccess,
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useGetPlacesByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["user-places", userId],
    queryFn: () => getPlacesByUserId(userId),
  });
};

export const useGetPlaceDetails = ({
  placeId,
  enabled,
}: {
  placeId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["place-details", placeId],
    queryFn: () => getPlaceDetails(placeId),
    enabled,
  });
};

export const useUpdatePlace = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: updatePlace,
    onSuccess,
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useDeletePlace = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: deletePlace,
    onSuccess,
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
