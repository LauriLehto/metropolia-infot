import React from 'react'

import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet'

export const Map = ({stops, lat, lon}) => {
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
        const ttdir = stop.gtfsId.split(':')[1]%2===0
        return (
          <Marker position={[stop.lat, stop.lon]} key={stop.gtfsId}>
            <Tooltip 
              direction={ttdir ? 'right' : 'left'} 
              offset={ttdir ? [0,30] : [ -20, 30]} 
              opacity={1} 
              permanent>
              <p style={{ fontSize: 12 }}>{stop.code.toUpperCase()}</p>
            </Tooltip>
          </Marker>)
      })}
    </MapContainer>
  )
}
