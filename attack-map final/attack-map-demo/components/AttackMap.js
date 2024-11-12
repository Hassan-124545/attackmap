import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import io from 'socket.io-client';
import axios from 'axios';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

function AttackMap() {
  const [attacks, setAttacks] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    // Fetch initial attacks data
    axios.get('/api/attacks').then((res) => setAttacks(res.data));

    // WebSocket setup
    const socket = io();
    socket.on('new-attack', (newAttack) => {
      setAttacks((prev) => [...prev, newAttack]);
    });
  }, []);

  return (
    <Map initialViewState={{ latitude: 0, longitude: 0, zoom: 2 }}
         mapboxAccessToken={MAPBOX_TOKEN}
         style={{ width: '100%', height: '100vh' }}
         mapStyle="mapbox://styles/mapbox/streets-v11">
      {attacks.map((attack) => (
        <Marker key={attack._id} latitude={attack.location.lat} longitude={attack.location.lng}>
          <div onClick={() => setPopupInfo(attack)}>📍</div>
        </Marker>
      ))}

      {popupInfo && (
        <Popup latitude={popupInfo.location.lat} longitude={popupInfo.location.lng}
               onClose={() => setPopupInfo(null)}>
          <div>
            <h3>{popupInfo.title}</h3>
            <p>{popupInfo.description}</p>
            <p>Severity: {popupInfo.severity}</p>
            {popupInfo.simulationAvailable && <button>Simulate Attack</button>}
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default AttackMap;