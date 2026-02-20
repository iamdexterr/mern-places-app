import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function LocationMap({
  center = [-74.006, 40.7128],
  zoom = 11,
  address,
}: {
  center?: [number, number];
  zoom?: number;
  address?: string;
}) {
  return (
    <Card className="h-[20rem] w-full p-0 overflow-hidden">
      <Map attributionControl={false} center={center} zoom={zoom}>
        <MapMarker longitude={center[0]} latitude={center[1]}>
          <MarkerContent>
            <MapPin
              className="fill-black stroke-white dark:fill-white"
              size={28}
            />
          </MarkerContent>
          {address && <MarkerTooltip>{address}</MarkerTooltip>}
        </MapMarker>
        <MapControls position="bottom-right" showZoom showFullscreen />
      </Map>
    </Card>
  );
}
