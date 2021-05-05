import React from 'react'

import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet'

export const Map = ({stops, lat, lon}) => {
  console.log(stops)
  return (
    <MapContainer center={[60.22465, 24.75940]} zoom={16} scrollWheelZoom={false} style={{ height: "85vh", widht: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[lat,lon]}
        pathOptions={{ color: 'black' }}
        radius={40}
      />
      {stops.length && stops.map(stop => {
        return (
          <Marker position={[stop.lat, stop.lon]} key={stop.gtfsId}>
            <Tooltip 
              //direction={stop.ttpos} 
              //offset={stop.offset} 
              opacity={1} 
              permanent>
              <p style={{ fontSize: 12 }}>{stop.name.toUpperCase()}</p>
            </Tooltip>
          </Marker>)
      })}
    </MapContainer>
  )
}
