import React, { useEffect, useState } from 'react';

const GoogleMap = ({ location }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (location) {
      if (typeof location === 'string') {
        geocodeLocation(location);
      } else if (typeof location === 'object' && location.lat && location.lng) {
        initializeMap(location);
      }
    }
  }, [location]);

  const geocodeLocation = (locationString) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationString }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        initializeMap(location);
      }
    });
  };

  const initializeMap = (location) => {
    const mapInstance = new window.google.maps.Map(document.getElementById('google-map'), {
      center: location,
      zoom: 15,
    });

    const markerInstance = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  return <div id="google-map" style={{ height: '300px', width: '100%' }}></div>;
};

export default GoogleMap;
