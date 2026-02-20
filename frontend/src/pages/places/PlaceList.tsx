import { Button } from "@/components/ui/button";
import PlaceItem from "./PlaceItem";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const PlaceList = (props) => {
  const navigate = useNavigate();
  if (props.items.length === 0) {
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
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
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

export default PlaceList;
