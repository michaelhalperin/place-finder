export const generateMapHTML = (
  latitude: number | null,
  longitude: number | null,
  places: { latitude: number; longitude: number; title: string }[]
) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; }
          #map { height: 100vh; width: 100vw; }
          .leaflet-control-zoom {
            position: fixed !important;
            bottom: 20px !important;
            left: 20px !important;
            top: auto !important;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', {
            zoomControl: false
          }).setView([${latitude || 0}, ${longitude || 0}], 16);
          
          L.control.zoom({
            position: 'bottomleft'
          }).addTo(map);
  
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          L.marker([${latitude || 0}, ${longitude || 0}], { 
            title: 'My Location'
          }).addTo(map);
  
          ${places
            .map(
              (place) => `
            L.marker([${place.latitude}, ${place.longitude}], {
              icon: new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })
            })
              .on('click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'markerClick',
                  place: ${JSON.stringify(place)}
                }));
              })
              .addTo(map);

            map.setView([${place.latitude}, ${place.longitude}], 13);
          `
            )
            .join("")}
        </script>
      </body>
    </html>
  `;
