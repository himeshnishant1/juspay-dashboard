import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useTheme } from '../contexts/ThemeContext';

const WorldMap = ({ locationData, height = 120 }) => {
  const { isDarkMode } = useTheme();
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return (
      <div style={{ 
        width: '100%', 
        height: `${height}px`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: isDarkMode ? '#374151' : '#f5f5f5',
        color: isDarkMode ? '#ffffff' : '#333333',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #4b5563' : '1px solid #e0e0e0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>Google Maps API key not configured</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
            Please add VITE_GOOGLE_MAPS_API_KEY to your .env file
          </p>
        </div>
      </div>
    );
  }

  const mapContainerStyle = {
    width: '100%',
    height: `${height}px`,
  };

  const center = {
    lat: 20,
    lng: 0,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: isDarkMode ? [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#374151' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#1f2937' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#4b5563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ] : [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e3f2fd' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f8f9fa' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  // City coordinates mapping
  const cityCoordinates = {
    'New York': { lat: 40.7128, lng: -74.0060 },
    'San Francisco': { lat: 37.7749, lng: -122.4194 },
    'Sydney': { lat: -33.8688, lng: 151.2093 },
    'Singapore': { lat: 1.3521, lng: 103.8198 },
    'London': { lat: 51.5074, lng: -0.1278 },
    'Tokyo': { lat: 35.6762, lng: 139.6503 },
    'Dubai': { lat: 25.2048, lng: 55.2708 },
  };

  const getMarkerSize = (revenue) => {
    const revenueValue = parseInt(revenue.replace('K', ''));
    const maxRevenue = Math.max(...locationData.map(l => parseInt(l.revenue.replace('K', ''))));
    const size = Math.max(8, (revenueValue / maxRevenue) * 20);
    return size;
  };

  const onLoad = useCallback((map) => {
    setMap(map);
    setIsLoaded(true);
    
    // Fit map to show all locations
    if (locationData && locationData.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locationData.forEach(location => {
        const coords = cityCoordinates[location.city];
        if (coords) {
          bounds.extend(new window.google.maps.LatLng(coords.lat, coords.lng));
        }
      });
      map.fitBounds(bounds);
      
      // Add some padding to the bounds
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 3) map.setZoom(3);
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [locationData]);

  const onUnmount = useCallback(() => {
    setMap(null);
    setIsLoaded(false);
  }, []);

  const createMarkerIcon = (size) => {
    if (!window.google || !window.google.maps) {
      return null;
    }
    
    const fillColor = isDarkMode ? '#3b82f6' : '#1976d2';
    const strokeColor = isDarkMode ? '#ffffff' : '#ffffff';
    const innerColor = isDarkMode ? '#ffffff' : '#ffffff';
    
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="${innerColor}"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(size, size),
      anchor: new window.google.maps.Point(size / 2, size / 2),
    };
  };

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      onLoad={() => setIsLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={2}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {isLoaded && locationData.map((location, index) => {
          const coords = cityCoordinates[location.city];
          if (!coords) return null;

          const markerSize = getMarkerSize(location.revenue);
          const icon = createMarkerIcon(markerSize);
          
          return (
            <Marker
              key={index}
              position={coords}
              icon={icon}
              title={`${location.city}: ${location.revenue}`}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default WorldMap;
