import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet'
import { 
  Container, 
  Col, 
  Row,
  Image,
  Table,
  Navbar
} from 'react-bootstrap'

import kuva from '../images/kuva.jpg'
import {Time} from '../components/Time'
/* import { useQuery, gql } from '@apollo/client' */

/* const STOPS_BY_ID = gql`
  query GetStopsById {
    {
      stop(id: "HSL:1140447") {
        name
        wheelchairBoarding
      }
    }
  }
`; */

const Trafic = () => {

  const [ stopsData, setData] = useState({})
  const [ time, setTime] = useState()

  const stopDetails = `
    {
      stop(id:"HSL:2132226"){
      id
      name
      gtfsId
      code
    }
  }`
  const nearest =` {
    nearest (lat:60.224028, lon:24.758914){
      edges{node{
        id
        distance
      }}
    }
  }`

  const getStopById = (id) => `
    {
      stop(id:${id}){
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

   
  const getStopsKaraportti = `
  {
    stops(name:"Karamalmen"){
      id
      gtfsId
      name
    }
  }
  `
  const hslApi = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

  /* useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date)
    }, 1000);
    return () => clearInterval(interval);
  }, []);
 */
  
  useEffect(()=>{
    let newData = {...stopsData}
    update()
      .then(result => {
        result.map(r => newData[r.data.data.stop.code]=r.data.data.stop)
        console.log(newData)
        setData(newData)
      })
  }, [setData])

  const update = async () => {
    const newData = {...stopsData}
    const hslIds = [
      'HSL:2132226','HSL:2132225', 'HSL:2132207', "HSL:2132208"
    ]
    return Promise.all(hslIds.map(id => getData(getStopById(`\"${id}\"`), id)))
  }

  const getData = async (query, id) => {
    try{
      return axios({
        url: hslApi,
        method: 'post',
        data: {
          query: query
        }
      });
    }catch(err){
      console.error(err)
    } 
  }

  

  var now = new Date(),
  then = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,0,0),
  diff = now.getTime() - then.getTime();
  diff = diff.toString()
  diff = diff.slice(0, -3)
  diff = parseInt(diff)
  /* if(stops[0]&&diff>stops[0].stop.stoptimesWithoutPatterns[0].scheduledArrival||stops[1]&&diff>stops[1].stop.stoptimesWithoutPatterns[0].scheduledArrival){
    console.log('update')
    update()
  } */

  const convertSeconds = (seconds) => {

    const hours = parseInt(seconds/3600)
    const minutes = parseInt(seconds%3600/60)
    return `${hours}:${minutes.toString().length>1? minutes: `0${minutes}`}`
  }

  

  const stops = [
    {
      lat:60.22347, 
      lon:24.76050,
      offset:[50, 0],
      ttpos:'right',
      code: "E1815",
      hslId: "HSL:2132226",
      header:'Pysäkki E1815'
    },
    {
      lat:60.22329,  
      lon:24.76034,
      offset:[-50, -10],
      ttpos:'left',
      code: "E1814",
      header:'Pysäkki E1814'
    },
    {
      lat:60.22572, 
      lon:24.75767,
      offset:[-70, 0],
      code: "E1807",
      ttpos:'left',
      header:'Pysäkki E1807'
    },
    {
      lat:60.22551, 
      lon:24.76065,
      offset:[50, 0],
      code: "E1808",
      ttpos:'right',
      header:'Pysäkki E1808'
    }
  ]

  const renderBusStopMarkers = () => (
    stops.map(stop=> {
      console.log(stopsData[stop.code])
      return (
      <Marker position={[stop.lat,stop.lon]} key={stop.code}>
        <Tooltip direction={stop.ttpos} offset={stop.offset} opacity={1} permanent>
          <p style={{fontSize:18}}><b>{stop.header.toUpperCase()}</b></p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Aika</th>
                <th>Suunta</th>
              </tr>
            </thead>
            <tbody>
              {stopsData[stop.code] ? 
                stopsData[stop.code].stoptimesWithoutPatterns.map(d => {
                  return (
                    <tr key={d.stopSequence+d.scheduledDeparture+d.realtimeDeparture}>
                      <td>{convertSeconds(d.realtimeDeparture)}</td>
                      <td>{d.headsign}</td>
                    </tr>
                  )
                }) : <></>}
            </tbody>
          </Table>
        </Tooltip>
      </Marker>)
    }
      
    )
  )

  return (
    <Container fluid>
      <Navbar bg="white">
        <Navbar.Brand>
          <img
            src="metropolia.svg"
            width="200"
            height="50"
            className="d-inline-block align-top"
            alt="Metropolia"
          />
        </Navbar.Brand>
        <Time time={time} />
      </Navbar>
      <MapContainer center={[60.2248, 24.7591]} zoom={17} scrollWheelZoom={false} style={{height:"90vh", widht:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker 
          center={[60.2238794,24.758149]} 
          pathOptions={{ color: 'red' }}
          radius={40}
          />
        {renderBusStopMarkers()}
      </MapContainer>
    
      {/* <Col>
        <h1>Bussit Karaportin kampukselta</h1>
        <h3>{time&&`${days[time.getDay()]}  ${time.toLocaleString()}`}</h3>
        <Row>
          <Col>
            <h3>Karamalmi</h3>
            <h2>E1815</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lähtee</th>
                 
                </tr>
              </thead>
              <tbody>
                {stops[0]&&stops[0].stop.stoptimesWithoutPatterns.map(d=> {
                  
                  let date = new Date
                  date = date.getTime()
                  return(
                    <tr key={d.scheduledArrival}>
                      <td>{convertSeconds(d.scheduledDeparture)} </td>
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h3>Karamalmi</h3>
            <h2>E1814</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lähtee</th>
                </tr>
              </thead>
              <tbody>
                {stops[0]&&stops[0].stop.stoptimesWithoutPatterns.map(d=> {
                  
                  let date = new Date
                  date = date.getTime()
                  return(
                    <tr key={d.scheduledArrival}>
                      <td>{convertSeconds(d.scheduledDeparture)} </td>
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Col>
          <Col sm="6" style={{height:"100%",position: "relative"}} className="flex-d align-items-strech justify-content-end">
            <div style={{height:"100%", position:"absolute"}}>
            <Image style={{width:"100%"}} src={kuva} alt="Kuva" />
            </div>
          </Col>
        </Row>
      </Col> */}
    </Container>
  )
}

export default Trafic
