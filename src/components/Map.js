import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const CATEGORY_ICONS = {
  beaches: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#00A0B0" />
      <path d="M12 6.5c-2.75 1.5-4.5 2.5-4.5 4.5 0 1.5 1.34 2.5 3 2.5s3-1 3-2.5c0-2-1.75-3-4.5-4.5z" fill="white" />
      <path d="M15.5 14c-.83 0-1.5.67-1.5 1.5v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5z" fill="white" />
    </svg>
  `,
  activities: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#6A4A3C" />
      <path d="M15 8.5A2.5 2.5 0 0012.5 6a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5A2.5 2.5 0 0015 8.5zM7.5 14c0-2.25 3.5-3.5 5-3.5s5 1.25 5 3.5V16h-10v-2z" fill="white" />
    </svg>
  `,
  food_and_drink: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#CC333F" />
      <path d="M14.5 8h-1V7h-3v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v4h3v-4h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z" fill="white" />
    </svg>
  `,
  default: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#EDC951" />
      <circle cx="12" cy="12" r="3" fill="white" />
    </svg>
  `
};

const popupContent = (location) => `
  <div class="popup-content">
    <h3 class="popup-title">${location.name}</h3>
    <p class="popup-type">${location.type} • ${location.cuisine}</p>
    <p class="popup-price">${location.price_range}</p>
    <p class="popup-address">${location.address || ''}</p>
    <p class="popup-hours">${location.hours || 'Hours not available'}</p>
    ${location.website ? `<a href="${location.website}" target="_blank" class="popup-website">Visit Website</a>` : ''}
  </div>
`;

export default function Map({ center, zoom, onMapChange, locations, selectedLocation, style }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const popups = useRef([]);

  const handleMapMove = useCallback(() => {
    if (map.current && onMapChange) {
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      onMapChange([center.lng, center.lat], zoom);
    }
  }, [onMapChange]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: center,
      zoom: zoom
    });

    map.current.on('moveend', handleMapMove);
    map.current.on('zoomend', handleMapMove);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current.off('moveend', handleMapMove);
      map.current.off('zoomend', handleMapMove);
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter(center);
      map.current.setZoom(zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (map.current && locations) {
      // Remove all existing markers and popups
      markers.current.forEach(marker => marker.remove());
      popups.current.forEach(popup => popup.remove());
      markers.current = [];
      popups.current = [];

      // Add markers for all locations
      locations.forEach(location => {
        const { longitude, latitude } = location.coordinates;

        const el = document.createElement('div');
        el.innerHTML = CATEGORY_ICONS[location.category] || CATEGORY_ICONS.default;
        el.className = 'marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([longitude, latitude])
          .addTo(map.current);

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false,
          className: 'custom-popup'
        })
          .setLngLat([longitude, latitude])
          .setHTML(popupContent(location));

        marker.getElement().addEventListener('click', () => {
          popups.current.forEach(p => p.remove());
          popup.addTo(map.current);
        });

        markers.current.push(marker);
        popups.current.push(popup);
      });
    }
  }, [locations]);

  useEffect(() => {
    if (map.current && selectedLocation) {
      const { longitude, latitude } = selectedLocation.coordinates;
      map.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true
      });

      // Show popup for selected location
      popups.current.forEach(p => p.remove());
      const popup = popups.current.find(p => 
        p._lngLat.lng === longitude && p._lngLat.lat === latitude
      );
      if (popup) {
        popup.addTo(map.current);
      }
    }
  }, [selectedLocation]);

  return (
    <>
      <div ref={mapContainer} style={style} />
      <style jsx global>{`
        .mapboxgl-popup-content {
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          max-width: 300px;
          font-family: 'Arial', sans-serif;
        }
        .mapboxgl-popup-close-button {
          font-size: 18px;
          padding: 8px 12px;
          color: #666;
          background: none;
          border: none;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .mapboxgl-popup-close-button:hover {
          color: #333;
        }
        .marker {
          display: block;
          border: none;
          cursor: pointer;
          padding: 0;
          background-color: transparent;
        }
        .marker svg {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
        }
        .popup-content {
          color: #333;
        }
        .popup-title {
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 8px;
          color: #1a1a1a;
        }
        .popup-type {
          font-size: 14px;
          margin: 0 0 6px;
          color: #666;
        }
        .popup-price {
          font-size: 14px;
          margin: 0 0 6px;
          color: #4a4a4a;
        }
        .popup-address {
          font-size: 12px;
          margin: 0 0 6px;
          color: #666;
        }
        .popup-hours {
          font-size: 12px;
          margin: 0 0 10px;
          color: #4a4a4a;
        }
        .popup-website {
          display: inline-block;
          font-size: 14px;
          color: #0066cc;
          text-decoration: none;
          padding: 6px 12px;
          border: 1px solid #0066cc;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .popup-website:hover {
          background-color: #0066cc;
          color: white;
        }
      `}</style>
    </>
  );
}