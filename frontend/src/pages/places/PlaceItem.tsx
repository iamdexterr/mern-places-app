import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LocationMap } from "@/components/Map";
import { useNavigate, useParams } from "react-router";
import authStore from "@/store/authStore";
import { toast } from "sonner";
import { useDeletePlace } from "@/hooks/usePlaces";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface PlaceItemProps {
  id: number;
  image: string;
  title: string;
  address: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  creatorId: string;
}

const PlaceItem = ({
  id,
  image,
  title,
  address,
  description,
  coordinates,
  creatorId,
}: PlaceItemProps) => {
  const userId = useParams().userId!;
  const [open, setOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { isLoggedIn, user } = authStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deletePlaceMutation = useDeletePlace({
    onSuccess: () => {
      toast.success("Place deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-places", userId] });
    },
  });

  const onDeletePlace = () => {
    console.log("Deleting");
    setConfirmDeleteModal(false);
    deletePlaceMutation.mutate(id);
  };
  return (
    <>
      <li className="list-none">
        <Card className="overflow-hidden pt-0">
          <div className="w-full h-60 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader className="">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {address}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2 border-t pt-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              View on Map
            </Button>
            {isLoggedIn && user?.id === creatorId && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/places/${id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setConfirmDeleteModal(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </li>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl ">
          <DialogHeader>
            <DialogTitle>Location</DialogTitle>
            <DialogDescription>{address}</DialogDescription>
          </DialogHeader>
          <LocationMap
            address={address}
            center={[coordinates.lng, coordinates.lat]}
          />

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmDeleteModal} onOpenChange={setConfirmDeleteModal}>
        <DialogContent className="sm:max-w-xl ">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this place?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setConfirmDeleteModal(false)}>Cancel</Button>
            <Button
              loading={deletePlaceMutation.isPending}
              variant="destructive"
              onClick={onDeletePlace}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaceItem;
