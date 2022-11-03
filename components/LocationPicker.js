import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "@mantine/core";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function LocationPicker({ isLocationPicker }) {
  const [center, setCenter] = React.useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [map, setMap] = React.useState(null);

  const handleLocation = (e) => {
    setCenter({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_SECRET}>
      <GoogleMap
        onClick={(e) => handleLocation(e)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
