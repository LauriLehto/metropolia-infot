export const hslApiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

export const stopsByRadius = (lat, lon) => `
{
  stopsByRadius(lat: ${lat}, lon: ${lon}, radius: 400) {
    edges {
      node {
        stop {
          name
          lat
          lon
          gtfsId
          code
        }
        distance
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
export const stopDetails = `
  {
    stop(id:"HSL:2132226"){
    id
    name
    gtfsId
    code
  }
}`
export const nearest =` {
  nearest (lat:60.224028, lon:24.758914){
    edges{node{
      id
      distance
    }}
  }
}`

export const getStopById = (id) => `
  {
    stop(id:"${id}"){
      id
      name
      code
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        timepoint
        realtime
        realtimeState
        pickupType
        dropoffType
        serviceDay
        stopHeadsign
        headsign
        stopSequence
      }
    }
  }`

  
  
export const getStopsKaraportti = `
{
  stops(name:"Karamalmen"){
    id
    gtfsId
    name
  }
}
`

export const getStationInfo = (id) => `
{
  station(id:"${id}"){
    id
    name
    stoptimesWithoutPatterns (numberOfDepartures:8) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      timepoint
      realtime
      realtimeState
      pickupType
      dropoffType
      serviceDay
      stopHeadsign
      headsign
      stopSequence
    }
  }
}
`

