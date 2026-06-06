import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router";
import { useGetPlacesByUserId } from "@/hooks/usePlaces";
import PlaceItem from "./places/PlaceItem";

const UserPlaces = () => {
  const userId = useParams().userId!;
  const navigate = useNavigate();

  const { data: places, isLoading: isPlacesLoading } =
    useGetPlacesByUserId(userId);
  if (isPlacesLoading) {
    return <div>Loading...</div>;
  }
  console.log(places);
  if (places.length === 0) {
    return (
      <Card className="flex items-center justify-center h-40">
        <h2>No places found. Maybe create one?</h2>
        <Button
          onClick={() => {
            navigate("/places/new");
          }}
        >
          Share Place
        </Button>
      </Card>
    );
  }

  return (
    <ul className="space-y-4 grid grid-cols-2 gap-4">
      {places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default UserPlaces;
