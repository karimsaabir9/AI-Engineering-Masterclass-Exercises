import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useTripDetail } from "@/app/Provider";
import { Activity, Itinerary } from "./ChatBox";

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { tripDetailInfo } = useTripDetail() || {};

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 1.7,
        projection: "globe",
      });
    }

    // Remove existing markers before adding new ones
    const markers: mapboxgl.Marker[] = [];

    if (tripDetailInfo?.itinerary) {
      tripDetailInfo.itinerary.forEach((itinerary: Itinerary) => {
        itinerary.activities.forEach((activity: Activity) => {
          const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([
              activity.geo_coordinates.longitude,
              activity.geo_coordinates.latitude,
            ])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name),
            )
            .addTo(mapRef.current!);
          markers.push(marker);

          const coordinates = [
            activity?.geo_coordinates?.longitude,
            activity?.geo_coordinates?.latitude,
          ] as [number, number];
          mapRef.current!.flyTo({
            center: coordinates,
            zoom: 8,
            essential: true,
          });
        });
      });
    }

    return () => {
      // Remove markers when component unmounts or data changes
      markers.forEach((marker) => marker.remove());
    };
  }, [tripDetailInfo]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Mapbox sizes its canvas from the container's dimensions at
    // construction time only; without this it stays stuck at whatever size
    // the container happened to be on first render (e.g. a stale/squished
    // canvas after switching between the stacked-mobile and side-by-side
    // desktop layouts, or any other container resize).
    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.resize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full lg:w-[95%]"
        style={{
          height: "85vh",
          borderRadius: 20,
        }}
      ></div>
    </div>
  );
}

export default GlobalMap;
