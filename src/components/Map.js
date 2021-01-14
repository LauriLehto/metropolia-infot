import React from 'react'

import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet'

export const Map = ({stops, ll}) => {
  return (
    <MapContainer center={ll} zoom={16} scrollWheelZoom={false} style={{ height: "90vh", widht: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={ll}
        pathOptions={{ color: 'orange' }}
        radius={40}
      />
      {stops.map(stop => {
        return (
          <Marker position={[stop.lat, stop.lon]} key={stop.code}>
            <Tooltip direction={stop.ttpos} offset={stop.offset} opacity={1} permanent>
              <p style={{ fontSize: 12 }}><b>{stop.header.toUpperCase()}</b></p>
            </Tooltip>
          </Marker>)
      })}
    </MapContainer>
  )
}
